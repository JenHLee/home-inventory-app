import React from 'react'
import Category from '../category/Category';

export default function Categories({ categories }) {
  return (
    <>
      <div className="categories">
        {categories.map((c) => (
          <Category key={c._id} item={c} />
        ))}
      </div>
    </>
  );
}