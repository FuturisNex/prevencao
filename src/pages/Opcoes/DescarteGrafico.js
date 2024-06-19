import React, { useState, useEffect, useRef } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    Button,
    Container,
    Typography,
    Box,
    CircularProgress,
    Grid,
    IconButton
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LabelList
} from 'recharts';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import SVGtoPDF from 'svg-to-pdfkit';
import database from '../../auth/firebase';
import GetAppIcon from '@mui/icons-material/GetApp';
import logo from "../../resources/images/logo.png";

const LossVisualization = () => {
    const [months, setMonths] = useState([]);
    const [stores, setStores] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [month, setMonth] = useState('');
    const [store, setStore] = useState('');
    const [department, setDepartment] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [top5, setTop5] = useState([]);
    const [loading, setLoading] = useState(false);
    const chartRef = useRef();

    useEffect(() => {
        const fetchMonthsAndStores = async () => {
            setLoading(true);
            try {
                const snapshot = await database.ref('losses').orderByChild('month').once('value');
                const data = snapshot.val();
                if (data) {
                    const uniqueMonths = [...new Set(Object.values(data).map(loss => loss.month))];
                    setMonths(uniqueMonths);

                    const uniqueStores = [...new Set(Object.values(data).map(loss => loss.store))];
                    setStores(uniqueStores);

                    const uniqueDepartments = [...new Set(Object.values(data).map(loss => loss.department))];
                    setDepartments(uniqueDepartments);
                }
            } catch (error) {
                console.error('Erro ao buscar os meses, lojas e departamentos: ', error);
            }
            setLoading(false);
        };

        fetchMonthsAndStores();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        console.log('Mês selecionado:', month);
        console.log('Loja selecionada:', store);
        console.log('Departamento selecionado:', department);

        if (month && store && department) {
            try {
                const snapshot = await database.ref('losses').orderByChild('month').equalTo(month).once('value');
                const data = snapshot.val();
                console.log('Snapshot:', data);

                if (data) {
                    const filteredData = Object.values(data).filter(loss => loss.store === store && loss.department === department);
                    console.log('Filtered Data:', filteredData);

                    const sortedTop5 = filteredData.sort((a, b) => b.lossCost - a.lossCost).slice(0, 5);
                    console.log('Top 5:', sortedTop5);

                    const totalLossSale = filteredData.reduce((acc, curr) => acc + parseFloat(curr.lossSale), 0);
                    const totalLossCost = filteredData.reduce((acc, curr) => acc + parseFloat(curr.lossCost), 0);
                    setFilteredData([
                        { name: 'Perdas', lossSale: totalLossSale.toFixed(2), lossCost: totalLossCost.toFixed(2) }
                    ]);
                    setTop5(sortedTop5);
                } else {
                    console.log('Nenhum dado encontrado.');
                    setFilteredData([]);
                    setTop5([]);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados: ', error);
            }
        }
        setLoading(false);
    };

    const handleDownloadPDF = async () => {
        const chart = chartRef.current;

        if (!chart || !chart.container) {
            console.error('O gráfico não foi renderizado corretamente.');
            return;
        }

        try {
            const svgString = getSVGString(chart.container);
            const pdfBlob = await convertSVGtoPDF(svgString);
            saveAs(pdfBlob, 'loss_visualization.pdf');
        } catch (error) {
            console.error('Erro ao criar o PDF:', error);
        }
    };

    const getSVGString = (container) => {
        const svgElement = container.querySelector('svg');
        if (!svgElement) {
            throw new Error('Elemento SVG não encontrado.');
        }
        return new XMLSerializer().serializeToString(svgElement);
    };

    const convertSVGtoPDF = async (svgString) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const svgImage = await fetch(svgUrl).then(res => res.text());
        const svgDoc = new SVGtoPDF(page);
        svgDoc.end(svgImage);

        return await pdfDoc.save();
    };

    return (
        <Container maxWidth="md">
            <Box mt={2} mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">DIFERENÇA DOS VALORES DE DESCARTE (CUSTO E VENDA)</Typography>
                <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
            </Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Selecionar Mês</MenuItem>
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Selecionar Loja</MenuItem>
                            {stores.map((store, index) => (
                                <MenuItem key={index} value={store}>{store}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Selecionar Departamento</MenuItem>
                            {departments.map((department, index) => (
                                <MenuItem key={index} value={department}>{department}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Buscar'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={5} mb={3}>
                <Typography variant="h4" component="h2" align="center">Gráfico de Perdas</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart ref={chartRef} data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={true} />
                    <Tooltip />
                    <Bar dataKey="lossSale" name="Valor da perda (venda)" fill="#32CD32">
                        <LabelList dataKey="lossSale" position="top" fill="#2e2e2e" />
                    </Bar>
                    <Bar dataKey="lossCost" name="Valor da perda (custo)" fill="#FFA500">
                        <LabelList dataKey="lossCost" position="top" fill="#2e2e2e" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Box mt={5} mb={3}>
                <Typography variant="h4" component="h2" align="center">Top 5 Perdas</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    ref={chartRef}
                    layout="vertical"
                    data={top5.map((loss, index) => {
                        const productData = loss.products.reduce((acc, product) => {
                            acc[product.description] = parseFloat(product.quantity);
                            return acc;
                        }, {});
                        return { name: 'Perdas', ...productData };
                    })}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={true} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    {top5.length > 0 && top5[0].products.map((product, index) => (
                        <Bar
                            key={index}
                            dataKey={product.description}
                            fill={`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`}
                        >
                            <LabelList dataKey={product.description} position="outside" fill="#000000" formatter={(value) => `${product.description}: ${value}`} />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
            <Box mt={2} display="flex" justifyContent="center">
                <Button onClick={handleDownloadPDF} startIcon={<GetAppIcon />} variant="outlined">
                    Download PDF
                </Button>
            </Box>
        </Container>
    );
};

export default LossVisualization;
