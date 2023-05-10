import React, { useState } from 'react';
import './addFoodData.css';

import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase/FirebaseConfig';

const AddFoodData = () => {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [mealType, setMealType] = useState('');
  const [foodAddon, setFoodAddon] = useState('');
  const [foodAddonPrice, setFoodAddonPrice] = useState('');
  const [restaurantAddressBuilding, setRestaurantAddressBuilding] =
    useState('');
  const [restaurantAddressStreet, setRestaurantAddressStreet] = useState('');
  const [restaurantAddressCity, setRestaurantAddressCity] = useState('');
  const [restaurantAddressPincode, setRestaurantAddressPincode] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [restaurantEmail, setRestaurantEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foodImage === null) {
      alert('Please Select Food Image');
      return;
    } else {
      const imageRef = ref(storage, `foodImage/${foodImage.name}`);
      uploadBytes(imageRef, foodImage)
        .then(() => {
          alert('Image Uploaded Successfully');
          getDownloadURL(imageRef).then((url) => {
            const foodData = {
              foodName,
              foodDescription,
              foodCategory,
              mealType,
              foodPrice,
              foodType,
              foodAddon,
              foodAddonPrice,
              foodImageUrl: url,
              restaurantName,
              restaurantAddressBuilding,
              restaurantAddressStreet,
              restaurantAddressCity,
              restaurantAddressPincode,
              restaurantPhone,
              restaurantEmail,
            };

            try {
              const docRef = addDoc(collection(db, 'foodData'), foodData);
              alert('Food Data Added Successfully ', docRef.id);
              setFoodName('');
              setFoodDescription('');
              setFoodCategory('');
              setMealType('');
              setFoodPrice('');
              setFoodType('');
              setFoodAddon('');
              setFoodAddonPrice('');
              setFoodImage(null);
              setRestaurantName('');
              setRestaurantAddressBuilding('');
              setRestaurantAddressStreet('');
              setRestaurantAddressCity('');
              setRestaurantAddressPincode('');
              setRestaurantPhone('');
              setRestaurantEmail('');

              // Delay the reload for 3 seconds
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } catch (error) {
              alert('Error Adding Food Data ', error);
            }
          });
        })
        .catch((error) => {
          alert('Error Uploading Image ', error.message);
        });
    }
  };

  return (
    <div className="form-outer">
      <h1 className="heading">BiteSquare Go | Add Food Data</h1>
      <form className="form-inner">
        <label>Food Name</label>
        <input
          type="text"
          name="food_name"
          required
          onChange={(e) => {
            setFoodName(e.target.value);
          }}
        />
        <br />
        <label>Food Description</label>
        <textarea
          rows="7"
          type="text"
          name="food_description"
          onChange={(e) => {
            setFoodDescription(e.target.value);
          }}
        />
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Food Category</label>
            <select
              name="food_category"
              onChange={(e) => {
                setFoodCategory(e.target.value);
              }}
            >
              <option value="null">Select Food Category</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="american">American</option>
            </select>
          </div>
          <div className="form-col">
            <label>Meal Type</label>
            <select
              name="meal_type"
              onChange={(e) => {
                setMealType(e.target.value);
              }}
            >
              <option value="null">Select Meal Type</option>
              <option value="dinner">Dinner</option>
              <option value="starters">Starters</option>
              <option value="breakfast">Breakfast</option>
              <option value="liquid">Liquid</option>
            </select>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Food Price</label>
            <input
              type="number"
              name="food_price"
              required
              onChange={(e) => {
                setFoodPrice(e.target.value);
              }}
            />
          </div>
          <div className="form-col">
            <label>Food Type</label>
            <select
              name="food_type"
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="null">Select Food Type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Add On Name</label>
            <input
              type="text"
              name="food_addon"
              onChange={(e) => setFoodAddon(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Add On Price</label>
            <input
              type="number"
              name="food_addon_price"
              onChange={(e) => {
                setFoodAddonPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <label>Food Image</label>
        <input
          type="file"
          name="food_image"
          required
          onChange={(e) => {
            setFoodImage(e.target.files[0]);
          }}
        />
        <br />
        <label>Restaurant Name</label>
        <input
          type="text"
          name="restaurant_name"
          required
          onChange={(e) => {
            setRestaurantName(e.target.value);
          }}
        />
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Restaurant Building Number/Name</label>
            <input
              type="text"
              name="restaurant_address_building"
              onChange={(e) => {
                setRestaurantAddressBuilding(e.target.value);
              }}
            />
          </div>
          <div className="form-col">
            <label>Restaurant Street / Area Name</label>
            <input
              type="text"
              name="restaurant_address_street"
              onChange={(e) => {
                setRestaurantAddressStreet(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Restaurant City</label>
            <input
              type="text"
              name="restaurant_address_city"
              onChange={(e) => {
                setRestaurantAddressCity(e.target.value);
              }}
            />
          </div>
          <div className="form-col">
            <label>Restaurant Pin-code</label>
            <input
              type="number"
              name="restaurant_address_pincode"
              onChange={(e) => {
                setRestaurantAddressPincode(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-col">
            <label>Restaurant Phone</label>
            <input
              type="number"
              name="restaurant_phone"
              onChange={(e) => {
                setRestaurantPhone(e.target.value);
              }}
            />
          </div>
          <div className="form-col">
            <label>Restaurant Email</label>
            <input
              type="email"
              name="restaurant_email"
              onChange={(e) => {
                setRestaurantEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <button onClick={handleSubmit}>Add food</button>
      </form>
    </div>
  );
};

export default AddFoodData;
