import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Table = ( {data, updateData, activeName} ) => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);

  const handleRemove = (event) => {
    const newData = data.filter(student => student.name !== event.target.name);
    updateData(newData);
  }

  const handleAdd = () => {
    updateData([...data, {name, height, age}])
    setName('');
    setHeight(0);
    setAge(0);
  }

  const renderRows = () => {
    return (
      data?.map(student => {
        const background = student.name === activeName ? 'grey' : 'white';
        return (
          <Row key={student.name} style={{marginTop: '10px', backgroundColor: background}}>
            <Col xs={3}>
              {student.name}
            </Col>
            <Col xs={3}>
              {student.height}
            </Col>
            <Col xs={3}>
              {student.age}
            </Col>
            <Col xs={3}>
              <Button variant="danger" type="button" style={{width: '100%'}} name={student.name} onClick={handleRemove}>
                Remove
              </Button>
            </Col>
          </Row>
        )
      })
    )
  }

  return (
    <div>
      <Row>
        <Col xs={3}>
          <Form.Control placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col xs={3}>
          <Form.Control placeholder="Height" name="height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Col>
        <Col xs={3}>
          <Form.Control placeholder="Age" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </Col>
        <Col xs={3}>
          <Button variant="primary" type="button" style={{width: '100%'}} onClick={handleAdd}>
            Add
          </Button>
        </Col>
      </Row>
      {renderRows()}
    </div>
  );
}

export default Table;
