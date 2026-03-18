'use client'
import React from 'react'
import { useState } from 'react';
import { Input } from './ui/input';

export const AddProdForm = ({user}) => {
 
  const [url, setUrl] = useState('');
  const [loading, setloading] = useState('');

  return (
    <form className='mx-auto w-full max-w-3xl'>
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
        </div>
    </form>
  )
}
