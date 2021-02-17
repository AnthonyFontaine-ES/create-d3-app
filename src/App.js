import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from 'd3';
import Table from './Table';

import ChartWrapper from './ChartWrapper';

const App = () => {
  const [data, setData] = useState([]);
  const [activeName, setActiveName] = useState(null);

  useEffect(() => {
    json('https://udemy-react-d3.firebaseio.com/children.json')
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, [])

  const updateData = (data) => {
    setData(data);
  }

  const renderChart = () => data?.length ? <ChartWrapper data={data} setActiveName={setActiveName} /> : "No data yet";

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>Titosoft</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={6} xs={12}>{renderChart()}</Col>
          <Col md={6} xs={12}><Table data={data} updateData={updateData} activeName={activeName} ></Table></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
