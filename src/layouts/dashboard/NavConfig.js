// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Home CMS',
    path: '/dashboard/home',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/home/banner-section'
      },
      {
        title: 'Second Section',
        path: '/dashboard/home/second-section'
      },
      {
        title: 'Core Competencies',
        path: '/dashboard/home/core-competencies'
      },
      {
        title: 'Support Services',
        path: '/dashboard/home/Support-Services'
      },
      {
        title: 'Minimize Logistical',
        path: '/dashboard/home/minimize-logistical'
      },
      {
        title: 'Contract Vehicles',
        path: '/dashboard/home/contract-section'
      },
      {
        title: 'Demonstrated Experience',
        path: '/dashboard/home/demonstrated-experience'
      }
    ],
  },
  {
    title: 'About-Us CMS',
    path: '/dashboard/about',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/about/banner-section',
        children: [
          {
            title: 'Second Section',
            path: '/dashboard/about/second-section'
          },
        ]
      },
      {
        title: 'Second Section',
        path: '/dashboard/about/second-section'
      },
      {
        title: 'Our Mission',
        path: '/dashboard/about/our-mission',
      },
      {
        title: 'Core Value',
        path: '/dashboard/about/core-value',
      },
      {
        title: 'Contract Vehicles',
        path: '/dashboard/about/contract-vehicles',
      },
      {
        title: 'SAM ASSERSIONS',
        path: '/dashboard/about/SAMASSERSIONS',
      },
      {
        title: 'Executive Leaders',
        path: '/dashboard/about/executive-leaders',
      },
      {
        title: 'Directors',
        path: '/dashboard/about/directors',
      },
      {
        title: 'Company Milestones',
        path: '/dashboard/about/company-milestones',
      },
      // {
      //   title: 'Assign Contest',
      //   path: '/dashboard/cricket/assign_contest_list'
      // },
    ],
  },
  {
    title: 'Training CMS',
    path: '/dashboard/training',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/training/banner-section'
      },
      {
        title: 'Capabilities Section',
        path: '/dashboard/training/capabilities'
      },
      {
        title: 'Analysis Section',
        path: '/dashboard/training/anylysis',
      },
      {
        title: 'Design Section',
        path: '/dashboard/training/design',
      },
      {
        title: 'Development Section',
        path: '/dashboard/training/development',
      },
      {
        title: 'Conversion Section',
        path: '/dashboard/training/conversion',
      },
      {
        title: 'Experience Section',
        path: '/dashboard/training/experience',
      },
      {
        title: 'Testimonials Section',
        path: '/dashboard/training/testimonials',
      },
    ],
  },
  {
    title: 'Service CMS',
    path: '/dashboard/service',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/service/banner-section'
      },
      {
        title: 'Capabilities Section',
        path: '/dashboard/service/services-capabilities'
      },
      {
        title: 'Instructional Section',
        path: '/dashboard/service/services-instructional',
      },
      {
        title: 'Administrative Section',
        path: '/dashboard/service/services-administrative',
      },
      {
        title: 'Experience Section',
        path: '/dashboard/service/services-experience',
      },
      {
        title: 'Information Technology Support',
        path: '/dashboard/service/information-technology-support',
      },
      {
        title: 'Testimonial Section',
        path: '/dashboard/service/testimonial-section',
      },
      // {
      //   title: 'Testimonials Section',
      //   path: '/dashboard/service/testimonialssection',
      // },
      
    ],
  },
  {
    title: 'Logistics CMS',
    path: '/dashboard/logistics',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/logistics/banner-section'
      },
      {
        title: 'Capabilities Section',
        path: '/dashboard/logistics/capabilities'
      },
      {
        title: 'Experience Section',
        path: '/dashboard/logistics/experience',
      },
    ],
  },
  {
    title: 'FMS CMS',
    path: '/dashboard/fms',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/fms/banner-section'
      },
      {
        title: 'Capabilities Upper Section',
        path: '/dashboard/fms/capabilities-slider'
      },
      {
        title: 'Third  Section',
        path: '/dashboard/fms/space-third-section',
      },
      {
        title: 'Analysis  Section',
        path: '/dashboard/fms/analysis',
      },
      {
        title: 'Experience Section',
        path: '/dashboard/fms/experience',
      },
      {
        title: 'Niche Capabilities',
        path: '/dashboard/fms/niche-capabilities',
      },
      
    ],
  },
  {
    title: 'Carrer CMS',
    path: '/dashboard/carrer',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/carrer/banner-section'
      },
      {
        title: 'Second-Section',
        path: '/dashboard/carrer/second-section'
      },
      {
        title: 'Notice',
        path: '/dashboard/carrer/notice'
      }
    ],
  },

  {
    title: 'Contact-Us CMS',
    path: '/dashboard/contact',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Contact Us',
        path: '/dashboard/contact/contact-us'
      },
    ],
  },
  {
    title: 'Employe CMS',
    path: '/dashboard/employe',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Baneer-Section',
        path: '/dashboard/employe/baneer-section'
      },
      {
        title: 'Employe-Section',
        path: '/dashboard/employe/second-section'
      },

    ],
  },
  

  {
    title: 'News',
    path: '/dashboard/news',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/news/banner-section'
      },
      {
        title: 'News',
        path: '/dashboard/news/latest-news'
      },
   
    ],
  },
  {
    title: 'SeaPort-NXG',
    path: '/dashboard/seaporte',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'Banner Section',
        path: '/dashboard/seaporte/banner-section'
      },
      {
        title: 'Quality-Assurance',
        path: '/dashboard/seaporte/quality-assurance'
      },
      {
        title: 'Quality Objectives',
        path: '/dashboard/seaporte/quality-objectives'
      },
   
    ],
  },
 
];


export default navConfig;
