import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const navigate = useNavigate()

    const validateForm = (formData) => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        return newErrors;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setLoading(false);
            return
        };

        try {
            const res = await login(formData);

            if (res.success) {
                toast.success(res.message)
                navigate('/list')
            } else {
                toast.error(res.error)
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center mx-4 min-h-screen">
            <Card className={`w-full max-w-md`}>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={`${errors.email && 'border-destructive focus-visible:ring-red-800'}`}
                                    disabled={loading}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    className={`${errors.password && 'border-destructive focus-visible:ring-red-800'}`}
                                    disabled={loading}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                        <Button className="w-full mt-2" disabled={loading}>
                            {loading ? <span className='flex items-center gap-1'><Loader2 className='animate-spin h-5 w-5' />Login</span> : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}

export default LoginPage