import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const UserRolesTable = () => {
  return (
    <Table hover bordered>
      <thead>
        <tr>
          <th scope='col'>Role ID</th>
          <th scope='col'>Role</th>
          <th scope='col'>Role Code</th>
          <th scope='col'>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserRolesTable;
