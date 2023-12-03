import React from 'react'
import Layout from '../../components/Layout'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Layout>
      <section className='dashboard container'>
        <Outlet />
      </section>
    </Layout>
  )
}

export default Dashboard