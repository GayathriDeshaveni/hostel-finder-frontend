import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';
const AdminPanel = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null);
  const [msg, setMsg] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

 const emptyForm = {
    name: '', city: '', nearbyCollege: '', address: '',
    price: '', gender: 'boys', contactNumber: '', image: '', rating: '',
    amenities: { wifi: false, food: false, ac: false, laundry: false }
  };
  const [form, setForm] = useState(emptyForm);

 useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchHostels();
  }, [user, navigate]);
  const fetchHostels = async () => {
    try {
      const res = await axios.get('${API_URL}/api/hostels');
      setHostels(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploadingImage(true);
  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('${API_URL}/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    setForm((prev) => ({ ...prev, image: res.data.url }));
  } catch (err) {
    setMsg('Image upload failed ❌');
  }
  setUploadingImage(false);
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (['wifi', 'food', 'ac', 'laundry'].includes(name)) {
      setForm({ ...form, amenities: { ...form.amenities, [name]: checked } });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...form,
        images: form.image ? [form.image] : []
      };
      if (editingHostel) {
        await axios.put(
          `${API_URL}/api/hostels/${editingHostel._id}`,
          submitData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMsg('Hostel updated successfully! ✅');
      } else {
        await axios.post(
          '${API_URL}/api/hostels',
          submitData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMsg('Hostel added successfully! ✅');
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditingHostel(null);
      fetchHostels();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Something went wrong ❌');
    }
  };

  const handleEdit = (hostel) => {
    setForm({
      name: hostel.name,
      city: hostel.city,
      nearbyCollege: hostel.nearbyCollege || '',
      address: hostel.address,
      price: hostel.price,
      gender: hostel.gender,
      contactNumber: hostel.contactNumber,
      image: hostel.images?.[0] || '',
      rating: hostel.rating || '',
      amenities: hostel.amenities
    });
    setEditingHostel(hostel);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hostel?')) return;
    try {
      await axios.delete(
        `${API_URL}/api/hostels/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('Hostel deleted! ✅');
      fetchHostels();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Delete failed ❌');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingHostel(null); setForm(emptyForm); }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Hostel'}
        </button>
      </div>

      {msg && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4">{msg}</div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {editingHostel ? 'Edit Hostel' : 'Add New Hostel'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'name', placeholder: 'Hostel Name' },
              { name: 'city', placeholder: 'City' },
              { name: 'nearbyCollege', placeholder: 'Nearby College' },
              { name: 'address', placeholder: 'Full Address' },
              { name: 'price', placeholder: 'Price per month (₹)', type: 'number' },
             { name: 'contactNumber', placeholder: 'Contact Number' },
              { name: 'rating', placeholder: 'Rating (1.0 - 5.0)', type: 'number' },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
              />
            ))}

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
            >
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="mixed">Mixed</option>
            </select>

            <div className="flex gap-4 items-center">
              {['wifi', 'food', 'ac', 'laundry'].map((a) => (
                <label key={a} className="flex items-center gap-1 cursor-pointer capitalize">
                  <input
                    type="checkbox"
                    name={a}
                    checked={form.amenities[a]}
                    onChange={handleChange}
                  />
                  {a}
                </label>
              ))}
            </div>

             {/* Image Upload field - full width */}
             <div className="md:col-span-2">
               <label className="block text-gray-600 font-medium mb-2">
                 🖼️ Hostel Image
               </label>
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
               />
               {uploadingImage && (
                 <p className="text-blue-500 text-sm mt-2">Uploading image... ⏳</p>
               )}
               {form.image && (
                 <img
                   src={form.image}
                   alt="Preview"
                   className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200"
                 />
               )}
             </div>
           </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            {editingHostel ? 'Update Hostel' : 'Add Hostel'}
          </button>
        </div>
      )}

      {/* Hostels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Image</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Name</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">City</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Price</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Gender</th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No hostels yet. Add your first hostel!
                </td>
              </tr>
            ) : (
              hostels.map((hostel) => (
                <tr key={hostel._id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {hostel.images?.[0] ? (
                      <img
                        src={hostel.images[0]}
                        alt={hostel.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl">🏠</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{hostel.name}</td>
                  <td className="px-4 py-3 text-gray-600">{hostel.city}</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">₹{hostel.price}</td>
                  <td className="px-4 py-3 capitalize text-gray-600">{hostel.gender}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(hostel)}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm hover:bg-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hostel._id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;