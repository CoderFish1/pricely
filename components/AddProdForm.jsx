'use client'
import React from 'react'
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export const AddProdForm = ({user}) => {
 
  const [url, setUrl] = useState('');
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {};

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
    </>
  )
}
