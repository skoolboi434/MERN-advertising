import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAdvertisersQuery } from '../slices/advertiserApiSlice';

const AdvertiserLookup = () => {
  const { data: advertisers } = useGetAdvertisersQuery();

  // Get the term searched
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAdvertisers = searchTerm.trim() === '' ? [] : (advertisers || []).filter(adv => adv.businessname.toLowerCase().includes(searchTerm.toLowerCase()) || `${adv.firstname} ${adv.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='border border-dark rounded shadow p-3'>
      <div className='border-bottom border-dark mb-5 pb-1'>
        <h3 className='mb-0'>Advertiser Lookup</h3>
      </div>

      <div className='actions-container text-center mb-3'>
        <p>
          Use the search bar below to find existing advertisers in
          <br />
          the system. Results will appear below
        </p>
        <div className='has-search w-75 mx-auto'>
          <input type='text' id='dashboard-advertiser-search' className='form-control' placeholder='Search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div id='advertiser-results-heading' className='my-3'>
          <span className='d-block w-75 mx-auto text-start'>
            <strong>Results</strong>
          </span>
        </div>
        <div className='w-75 mx-auto mt-2'>
          <div id='dashboard-advertiser-results' className='list-group'>
            {searchTerm.trim() !== '' && filteredAdvertisers.length === 0 && <span className='list-group-item text-muted'>No advertisers found.</span>}
            {filteredAdvertisers.map(adv => (
              <Link key={adv._id} to={`/advertisers/${adv._id}`} className='list-group-item list-group-item-action'>
                {adv.businessname} — {adv.firstname} {adv.lastname}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserLookup;
