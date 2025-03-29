import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { LoaderCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';

function EditUserPage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(res.data.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate()
  const handleUpdate = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      console.log("Updated user:", user);

      navigate('/list');
      toast.success("User updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    } finally {
      setDisabled(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[90vh] container px-4 mx-auto'>
        <LoaderCircle className='animate-spin w-10 h-10' />
      </div>
    )
  }
  return (
    <div className='my-20 max-w-2xl px-4 mx-auto'>
      <h1 className='mb-4 text-2xl font-semibold max-sm:text-center'>Edit user details:</h1>
      <Card className="w-full mx-auto shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.first_name[0]}</AvatarFallback>
            </Avatar>

            <form onSubmit={handleUpdate} className="w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="first_name"
                    pattern="[A-Za-z]{2,20}$"
                    value={user.first_name}
                    onChange={handleInputChange}
                    disabled={disabled}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="last_name"
                    pattern="[A-Za-z]{2,20}$"
                    value={user.last_name}
                    onChange={handleInputChange}
                    disabled={disabled}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={disabled}
                />
              </div>
              <div className="flex justify-end mt-6">
                <Button disabled={disabled}>
                  {disabled && <LoaderCircle className='animate-spin h-5 w-5 mr-1' />}Update</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditUserPage