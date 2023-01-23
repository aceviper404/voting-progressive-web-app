import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function HomePage() {
    const [namesSet, setNamesSet] = useState(new Set());
    const [formData, setFormData] = useState({
      names: [''],
      code: ''
    });
    const [codeExists, setCodeExists] = useState(false);
    const { register, handleSubmit } = useForm();
  
    useEffect(() => {
      const loadSavedData = async () => {
        try {
          // load saved data from localStorage
          const savedData = localStorage.getItem('formData');
          if (savedData) {
            setFormData(JSON.parse(savedData));
          }
        } catch (err) {
          console.error(err);
        }
      };
      loadSavedData();
    }, []);

      // function to remove a specific name field
  const removeNameField = index => {
    setFormData(prevData => {
      // filter out the name field at the specified index
      const updatedNames = prevData.names.filter((name, i) => i !== index);
      return {
        ...prevData,
        names: updatedNames
      };
    });
  };
  
    const onSubmit = async data => {
      try {
        // check if code already exists on server
        const response = await axios.get(`http://flutter-voting-app.herokuapp.com/codeExists/${data.code}`);
        if (response.status === 200) {
          setCodeExists(response.data);
          if (!codeExists) {
            // save form data to localStorage
            localStorage.setItem('formData', JSON.stringify(data));
          }
        } else {
          throw new Error('Failed to check code existence');
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const addNameField = () => {
      setFormData(prevData => ({
        ...prevData,
        names: [...prevData.names, '']
      }));
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData.names.map((name, index) => (
          <div key={index}>
            <label>Name {index + 1}:</label>
            <input type="text" defaultValue={name} {...register(`names[${index}]`,{required: true})}/>
            <button type="button" onClick={() => removeNameField(index)}>X</button>
          </div>
        ))}
        <button type="button" onClick={addNameField}>Add</button>
        <div>
        <label>Code:</label>
        <input type="text" defaultValue={formData.code} {...register("code",{required: true})} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {codeExists && <p>Code already exists. Please enter a different code.</p>}
    </form>
  );
}

export default HomePage;