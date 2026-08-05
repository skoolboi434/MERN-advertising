import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetPublicationsQuery } from '../../../slices/publicationApiSlice';
import { useCreateProductMutation, useGetProductsQuery } from '../../../slices/admin/classifiedApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { FaTrash } from 'react-icons/fa';

const initialProductFormState = {
  name: '',
  inStock: true,
  price: '',
  publications: []
};

const ClassifiedsDashboard = () => {
  // Get all publications
  const { data: publications, isLoadingPublications, publicationsError, refetchPublications } = useGetPublicationsQuery();

  // Get Products
  const { data: products, isLoading: isLoadingProducts, error: productsError, refetch: refetchProducts } = useGetProductsQuery();

  // Loop through publications in form
  const [selectedPublications, setSelectedPublications] = useState([]);

  const handlePublicationChange = publicationId => {
    setSelectedPublications(prev => (prev.includes(publicationId) ? prev.filter(id => id !== publicationId) : [...prev, publicationId]));
  };

  // Open Create Product Modal

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);

  const openCreateProductModal = () => {
    setShowCreateProductModal(true);
  };

  // Create Product
  const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation();

  const [productFormData, setProductFormData] = useState(initialProductFormState);

  const handleProductChange = e => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitNewProductHandler = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...productFormData,
        publications: selectedPublications
      };
      await createProduct(payload).unwrap();
      toast.success('Product created');
      setShowCreateProductModal(false);
      setProductFormData(initialProductFormState);
      refetchProducts();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // End Create Product

  return (
    <Container>
      <div className='heading-container text-center my-5'>
        <h3 className='heading mb-3'>Admin - Classifieds</h3>
      </div>

      <div className='link-container mb-3'>
        <Link to='/admin'>Back to Admin dashboard</Link>
      </div>

      <Tabs defaultActiveKey='products' id='fill-tab-accounts' fill>
        <Tab eventKey='products' title='Products' className='p-3'>
          <div className='action-container mb-3'>
            <Button variant='primary' onClick={openCreateProductModal}>
              Create New Product
            </Button>
          </div>

          {/* Create new account type modal */}

          <Modal show={showCreateProductModal} onHide={() => setShowCreateProductModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
              <Form onSubmit={submitNewProductHandler}>
                <Form.Group className='mb-3'>
                  <Form.Label>Product Name:</Form.Label>
                  <Form.Control type='text' name='name' value={productFormData.name} onChange={handleProductChange} required />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Product Price:</Form.Label>
                  <Form.Control type='number' name='price' value={productFormData.price} onChange={handleProductChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type='checkbox'
                    label='In Stock'
                    checked={productFormData.inStock}
                    onChange={e =>
                      setProductFormData({
                        ...productFormData,
                        inStock: e.target.checked
                      })
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Publications:</Form.Label>
                  {publications?.map(publication => (
                    <Form.Check key={publication._id} type='checkbox' id={`publication-${publication._id}`} label={publication.name} checked={selectedPublications.includes(publication._id)} onChange={() => handlePublicationChange(publication._id)} />
                  ))}
                </Form.Group>
                <Modal.Footer className='justify-content-lg-between d-flex'>
                  <Button variant='secondary' onClick={() => setShowCreateProductModal(false)}>
                    Cancel
                  </Button>
                  <Button variant='primary' type='submit'>
                    Create Product
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          {/* End create account type modal */}

          {isLoadingProducts ? (
            <Loader />
          ) : productsError ? (
            <Message variant='danger'>{productsError?.data?.message || productsError.productsError}</Message>
          ) : (
            <Table hover bordered>
              <thead>
                <tr>
                  <th scope='col'>ID#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>In Stock</th>
                  <th scope='col'>Publications</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>#{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.inStock ? <Badge bg='success'>In Stock</Badge> : <Badge bg='danger'>Out of Stock</Badge>}</td>
                    <td>{product.publications.map(publication => publication.name).join(', ')}</td>
                    <td>
                      <Button variant='link'>
                        <FaTrash className='text-danger' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        <Tab eventKey='categories' title='Categories' className='p-3'>
          <div className='action-container mb-3'>
            <Button variant='primary' to='/'>
              Create New Category
            </Button>
          </div>
        </Tab>
        <Tab eventKey='orders' title='Orders' className='p-3'>
          <div className='action-container mb-3'></div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ClassifiedsDashboard;
