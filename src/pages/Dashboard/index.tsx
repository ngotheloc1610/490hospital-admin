import React from 'react'
import Layout from '../../components/Layout'
import TotalView from '../../components/common/TotalView'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Layout>
      <section className='dashboard container'>
        <TotalView />
        <Outlet />
      </section>
    </Layout>
  )
}

export default Dashboard