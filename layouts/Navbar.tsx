import {
  BellOutlined,
  RocketOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { ReactElement } from 'react';

function Navbar(): ReactElement {
  return (
    <Row
      justify='space-between'
      align='middle'
      className='nav-containe shadow-sm	 rounded-b-xl h-20 px-20 bg-primary-color text-white'
    >
      <Col md={6}>
        <Link href='/'>
          <Row align='middle' className='cursor-pointer'>
            <RocketOutlined className='text-3xl text-white' />
            <div className='ml-1 text-2xl font-bold'>ME ADMIN</div>
          </Row>
        </Link>
      </Col>
      <Col md={8} className='flex justify-center'>
        <ul className='flex gap-5 items-center h-full justify-end text-gray-800 font-regular'>
        <Link href='/'>
            <li className='nav-item text-md'>Dashboard</li>
          </Link>
          <Link href='/contacts'>
            <li className='nav-item text-md'>Contacts</li>
          </Link>
          <Link href='/calendar'>
            <li className='nav-item text-md'>Calendar</li>
          </Link>
          <Link href='/news-editor'>
            <li className='nav-item text-md'>NEWS / BLOG</li>
          </Link>
        </ul>
      </Col>
      <Col md={10}>
        <ul className='flex gap-5 items-center h-full justify-end'>
          <li className='nav-item text-md'>
            <SearchOutlined />
          </li>

          <Link href='/referral'>
            <li className='nav-item text-md'>
              <BellOutlined />
            </li>
          </Link>
          <li className='nav-item text-md'></li>
        </ul>
      </Col>
    </Row>
  );
}

export default Navbar;
