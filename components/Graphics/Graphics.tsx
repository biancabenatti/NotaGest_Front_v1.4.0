'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import MapView from '../Maps/MapView'; 
import L from 'leaflet';
import Cards from '../Cards/Cards';

interface FileData {
  id: number;
  title: string;
  value: number;
  category: string;
  subcategory: string;
  property: string;
}

interface GraphicsProps {
  files: FileData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

const Graphics: React.FC<GraphicsProps> = ({ files }) => {

  // Agrupar valor total por categoria
  const categoryData = files.reduce<{ name: string; value: number }[]>((acc, file) => {
    const index = acc.findIndex(item => item.name === file.category);
    if (index >= 0) acc[index].value += file.value;
    else acc.push({ name: file.category, value: file.value });
    return acc;
  }, []);

  // Agrupar valor total por subcategoria
  const subcategoryData = files.reduce<{ name: string; value: number }[]>((acc, file) => {
    const index = acc.findIndex(item => item.name === file.subcategory);
    if (index >= 0) acc[index].value += file.value;
    else acc.push({ name: file.subcategory, value: file.value });
    return acc;
  }, []);

  return (
    <div className="px-4 lg:px-16 py-10 space-y-10">

      {/* Linha superior: Valor por Categoria e Valor por Subcategoria */}
      <Cards />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Valor por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0c4a6e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Valor por Subcategoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={subcategoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Linha inferior: Distribuição por Categoria + Geolocalização */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Distribuição por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Geolocalização</h2>
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default Graphics;
