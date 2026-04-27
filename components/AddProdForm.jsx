'use client'
import React from 'react'
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { addProduct } from '@/app/actions';
import { toast } from 'sonner';

export const AddProdForm = ({user}) => {
 
  const [url, setUrl] = useState('');
  const [loading, setloading] = useState(false);
  const [showAuthModal, setshowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(!user){
        setshowAuthModal(true);
        return;
      }

      setloading(true);

      const formData = new FormData();
      formData.append('url', url);

      const result = await addProduct(formData);

      if(result.error){
        toast.error(result.error);
      }else{
        toast.success(result.message || 'Products tracked successfully');
        setUrl("");
      }

      setloading(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='mx-auto w-full max-w-3xl'>
        <div className='flex flex-col sm:flex-row gap-3'
        >
            <Input
            type='url'
            value={url}
            onChange = {(e) => setUrl(e.target.value)}
            placeholder = 'Paste a product URL (Amazon, Flipkart, Myntra, etc.)'
            required
            disabled ={loading}
            className='h-12 text-base mx-auto w-3xl border-3 hover:border-4'
            />

            <Button className= 'mx-auto h-12 bg-emerald-800 hover:bg-emerald-700 hover:p-3 '
            type="submit"
            disabled={loading}
            >
                {loading ? (
                    <>
                    <Loader2 className='h-12 m-4 animate-spain'/>
                    Adding...
                    </> 
                    ) : (
                        "Track Price"
                )}
            </Button>
        </div>
    </form>

    {/* authentication model */}
    <AuthModal
              isOpen={showAuthModal}
              onClose={() => setshowAuthModal(false)}
            />
    </>
  )
}
