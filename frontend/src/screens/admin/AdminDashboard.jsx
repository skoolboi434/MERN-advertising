import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ContainerCustom from '../../components/ContainerCustom';
import { FaGear } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <Container>
      <div className='heading-container text-center my-5'>
        <h3 className='heading'>Welcome To Your Admin Portal</h3>

        <p>
          Select an area below to view,
          <br />
          edit, and manage!
        </p>
      </div>
      <div className='admin-landing-container'>
        <Row className='admin-blocks'>
          <Col md={12} lg={4}>
            <Link to='/admin/accounts' className='text-decoration-none'>
              <ContainerCustom>
                <div className='text-center'>
                  <h3 className='title'>Admin - Accounts</h3>
                  <span>Users | Account Types | User Roles</span>
                </div>
              </ContainerCustom>
            </Link>
          </Col>

          <Col md={12} lg={4}>
            <Link to='/admin/classifieds' className='text-decoration-none'>
              <ContainerCustom>
                <div className='text-center'>
                  <h3 className='title'>Admin - Classifieds</h3>
                  <span>Products | Categories | Orders</span>
                </div>
              </ContainerCustom>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AdminDashboard;
