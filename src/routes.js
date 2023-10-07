import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';



import UserDetails from './pages/UserDetail';
// import Settings from './pages/Settings';
// components
import LoadingScreen from './components/LoadingScreen';
import BaneerPart from './components/common/Bannerpart';
import HomeSecondSection from './pages/homepage/homeSecondSection';
import ContractVehicles from './pages/homepage/ContractVehicles';
import LatestNews from './pages/News/LatestNews';
import CoreCompetencies from './pages/homepage/coreCompetencies';
import MinimizLogistical from './pages/homepage/MinimizeLogistical';
import DemonstratedExperience from './pages/homepage/DemonstratedExperience';
import SupportServices from './pages/homepage/SupportServices';
import SecondSection from './pages/aboutpage/secondsection';
import OurMission from './pages/aboutpage/OurMission';
import CoreValue from './pages/aboutpage/CoreValue';
import ContractVehiclesAbout from './pages/aboutpage/ContractVehicles';
import ExecutiveLeaders from './pages/aboutpage/ExecutiveLeaders';
import Directors from './pages/aboutpage/Directors';
import CompanyMilestones from './pages/aboutpage/CompanyMilestones';
import Secondsection from './pages/CareerPage/Secondsection';
import Notice from './pages/CareerPage/ContractVehicles';
import Employees from './pages/employees/OurMission';
import BaneerPart1 from './pages/employees/ContractVehicles';
import Capabilities from './pages/Training/capabilities';
import ContractVehiclesTrainging from './pages/Training/ContractVehicles';
import Design from './pages/Training/Design';
import Analysis from './pages/Training/Analysis';
import Development from './pages/Training/Development';
import Conversion from './pages/Training/Conversion';
import Experience from './pages/Training/Experience';
import Testimonials from './pages/Training/Testimonials';
import CapabilitiesSection from './pages/Logistics/CapabilitiesSection';
import ExperienceSection from './pages/Logistics/ExperienceSection';
import PastNews from './pages/News/PastNews';
import SAMASSERSIONS from './pages/aboutpage/SAMSSERSIONS';
import { FMSExperienceSection } from './pages/FMS/FMSExperienceSection';
import FMSLowerCapabilities from './pages/FMS/FMSLowerCapabilities';
import { FMSAnalysis } from './pages/FMS/FMSAnalysis';
import CapabilitiesSliderSection from './pages/Logistics/CapabilitiesSection';
import FMSSliderCapabilities from './pages/FMS/FMSSliderCapabilities';
import { FMSSpace } from './pages/FMS/FMSSpace';
import { SeaporteQualityAssurance } from './pages/Seaporte/SeaporteQualityAssurance';
import ServicesCapabilities from './pages/Service/ServicesCapabilities';
import { ServicesInstructional } from './pages/Service/ServicesInstructional';
import { ServicesAdministrative } from './pages/Service/ServicesAdministrative';
import { ServicesExperience } from './pages/Service/ServicesExperience';
import { ServicesITSupportSection } from './pages/Service/ServicesITSupportSection';
import { ServiceTestimonial } from './pages/Service/ServiceTestimonial';
import { SeaPortBanner } from './pages/Seaporte/SeaPortBanner';
import { SeaportEObjective } from './pages/Seaporte/SeaportEObjective';
import { AboutBanner } from './pages/aboutpage/AboutBanner';
import { FMSBaneer } from './pages/FMS/FMSBaneer';
import { Homepagebanner } from './pages/homepage/Homepagebanner';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { path: 'app', element: isAuthenticated ? <DashboardApp /> : <Navigate to="/login" /> },
                {
                    path: 'home/banner-section', element: isAuthenticated ? <Homepagebanner url="page-common/home" name="HOME" /> : <Navigate to="/login" />
                },
                { path: 'home/second-section', element: isAuthenticated ? <HomeSecondSection /> : <Navigate to="/login" /> },
                { path: 'home/core-competencies', element: isAuthenticated ? <CoreCompetencies /> : <Navigate to="/login" /> },
                { path: 'home/minimize-logistical', element: isAuthenticated ? <MinimizLogistical /> : <Navigate to="/login" /> },
                { path: 'home/demonstrated-experience', element: isAuthenticated ? <DemonstratedExperience /> : <Navigate to="/login" /> },
                { path: 'home/contract-section', element: isAuthenticated ? <ContractVehicles /> : <Navigate to="/login" /> },
                { path: 'home/Support-Services', element: isAuthenticated ? <SupportServices /> : <Navigate to="/login" /> },


                //contact us
                { path: 'contact/contact-us', element: isAuthenticated ? <CmsContact /> : <Navigate to="/login" /> },


                //about us
                {
                    path: 'about/banner-section', element: isAuthenticated ? <AboutBanner url="page-common/about" name="ABOUT" /> : <Navigate to="/login" />
                },
                { path: 'about/second-section', element: isAuthenticated ? <SecondSection /> : <Navigate to="/login" /> },
                { path: 'about/our-mission', element: isAuthenticated ? <OurMission /> : <Navigate to="/login" /> },
                { path: 'about/core-value', element: isAuthenticated ? <CoreValue /> : <Navigate to="/login" /> },
                { path: 'about/contract-vehicles', element: isAuthenticated ? <ContractVehiclesAbout /> : <Navigate to="/login" /> },
                { path: 'about/SAMASSERSIONS', element: isAuthenticated ? <SAMASSERSIONS /> : <Navigate to="/login" /> },
                { path: 'about/executive-leaders', element: isAuthenticated ? <ExecutiveLeaders /> : <Navigate to="/login" /> },
                { path: 'about/directors', element: isAuthenticated ? <Directors /> : <Navigate to="/login" /> },
                { path: 'about/company-milestones', element: isAuthenticated ? <CompanyMilestones /> : <Navigate to="/login" /> },
                //career
                { path: 'carrer/banner-section', element: isAuthenticated ? <BaneerPart url="page-common/career" name="CAREER" /> : <Navigate to="/login" /> },
                { path: 'carrer/second-section', element: isAuthenticated ? <Secondsection /> : <Navigate to="/login" /> },
                { path: 'carrer/notice', element: isAuthenticated ? <Notice /> : <Navigate to="/login" /> },
                //EMPLOYE
                { path: 'employe/baneer-section', element: isAuthenticated ? <BaneerPart1 /> : <Navigate to="/login" /> },
                { path: 'employe/second-section', element: isAuthenticated ? <Employees /> : <Navigate to="/login" /> },


                //training 
                { path: 'training/banner-section', element: isAuthenticated ? <BaneerPart url="common-header-list/training" name="TRAINING" /> : <Navigate to="/login" /> },
                { path: 'training/capabilities', element: isAuthenticated ? <Capabilities url="training-project-list" name="Capabilities" /> : <Navigate to="/login" /> },
                { path: 'training/anylysis', element: isAuthenticated ? <Analysis /> : <Navigate to="/login" /> },
                { path: 'training/design', element: isAuthenticated ? <Design /> : <Navigate to="/login" /> },
                { path: 'training/development', element: isAuthenticated ? <Development /> : <Navigate to="/login" /> },
                { path: 'training/conversion', element: isAuthenticated ? <Conversion /> : <Navigate to="/login" /> },
                { path: 'training/experience', element: isAuthenticated ? <Experience /> : <Navigate to="/login" /> },
                { path: 'training/testimonials', element: isAuthenticated ? <Testimonials /> : <Navigate to="/login" /> },
                // { path: 'training/contract-vehicles', element: isAuthenticated ? <ContractVehiclesTrainging /> : <Navigate to="/login" /> },


                { path: 'training/contract-vehicles', element: isAuthenticated ? <ContractVehiclesTrainging /> : <Navigate to="/login" /> },
                //Logistics 
                { path: 'logistics/banner-section', element: isAuthenticated ? <BaneerPart url="common-header-list/logistics" name="LOGISTICS" /> : <Navigate to="/login" /> },
                { path: 'logistics/capabilities', element: isAuthenticated ? <CapabilitiesSection url="logistics-capabilites-list" name="CAPABILITES" /> : <Navigate to="/login" /> },
                { path: 'logistics/experience', element: isAuthenticated ? <ExperienceSection url="logistics-experince-list" name="EXPERIENCE" /> : <Navigate to="/login" /> },


                { path: 'user-details/:id', element: isAuthenticated ? <UserDetails /> : <Navigate to="/login" /> },
                { path: 'profile', element: isAuthenticated ? <Profile /> : <Navigate to="/login" /> },

                //NEWS
                { path: 'news/banner-section', element: isAuthenticated ? <BaneerPart url="page-common/news" name="NEWS" /> : <Navigate to="/login" /> },
                { path: 'news/latest-news', element: isAuthenticated ? <LatestNews   /> : <Navigate to="/login" /> },
                // { path: 'news/past-news', element: isAuthenticated ? <PastNews url="training-capabilites-list" name="NEWS PAST"       /> : <Navigate to="/login" /> },git

                //FMS
                { path: 'fms/banner-section', element: isAuthenticated ? <FMSBaneer url="page-common/fms" name="FMS" /> : <Navigate to="/login" /> },
                { path: 'fms/capabilities-slider', element: isAuthenticated ? <FMSSliderCapabilities url="fms-capabilites-list" name="SLIDER CAPABILITES" /> : <Navigate to="/login" /> },
                { path: 'fms/space-third-section', element: isAuthenticated ? <FMSSpace url="page-common/analysis" name="FMS THIRD SECTION" /> : <Navigate to="/login" /> },
                { path: 'fms/analysis', element: isAuthenticated ? <FMSAnalysis url="page-common/analysis" name="FMS" /> : <Navigate to="/login" /> },
                { path: 'fms/experience', element: isAuthenticated ? <FMSExperienceSection url="fms-experince-list" name="EXPERIENCE" /> : <Navigate to="/login" /> },
                { path: 'fms/niche-capabilities', element: isAuthenticated ? <FMSLowerCapabilities url="page-common/lowerCapabilities" name="NICHE CAPABILITIES" /> : <Navigate to="/login" /> },

                //SERVICE
                { path: 'service/banner-section', element: isAuthenticated ? <BaneerPart url="common-header-list/services" name="SERVICE" /> : <Navigate to="/login" /> },
                { path: 'service/services-capabilities', element: isAuthenticated ? <ServicesCapabilities url="service-capabilites-list" name="CAPABILITES" /> : <Navigate to="/login" /> },
                { path: 'service/services-instructional', element: isAuthenticated ? <ServicesInstructional url="services/servicesInstructional" name="INSTRUCTIONAL" /> : <Navigate to="/login" /> },
                { path: 'service/services-administrative', element: isAuthenticated ? <ServicesAdministrative url="services/servicesAdministrative" name="ADMINISTRATIVE" /> : <Navigate to="/login" /> },
                { path: 'service/services-experience', element: isAuthenticated ? <ServicesExperience url="services/services-experience" name="EXPERIENCE" /> : <Navigate to="/login" /> },
                { path: 'service/information-technology-support', element: isAuthenticated ? <ServicesITSupportSection url="page-common/lowerCapabilities" name="INFORMATION TECHNOLOGY SUPPORT" /> : <Navigate to="/login" /> },
                { path: 'service/testimonial-section', element: isAuthenticated ? <ServiceTestimonial url="service-experience-add" name="TESTIMONIAL" /> : <Navigate to="/login" /> },
                { path: 'service/lowerCapabilities', element: isAuthenticated ? <FMSLowerCapabilities url="page-common/lowerCapabilities" name="LOWERCAPABILITIES" /> : <Navigate to="/login" /> },


                //SEAPORTE
                { path: 'seaporte/banner-section', element: isAuthenticated ? <SeaPortBanner url="page-common/seaport" name="SEAPORTE" /> : <Navigate to="/login" /> },
                { path: 'seaporte/quality-assurance', element: isAuthenticated ? <SeaporteQualityAssurance url="seaporte-quality-assurance" name="QUALITY ASSURANCE" /> : <Navigate to="/login" /> },
                { path: 'seaporte/quality-objectives', element: isAuthenticated ? <SeaportEObjective url="seaporte-obj-details" name="QUALITY OBJECTIVES" /> : <Navigate to="/login" /> },


            ]
        },

        {
            path: '/',
            // element: <LogoOnlyLayout />,
            children: [
                { path: '/', element: <Navigate to="/dashboard/app" /> },
                { path: 'login', element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <Login /> },
                { path: 'reset-password', element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <ResetPassword /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}


// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('./pages/Auth/Login')));
const ResetPassword = Loadable(lazy(() => import('./pages/Auth/ResetPassword')));
// Dashboard
const DashboardApp = Loadable(lazy(() => import('./pages/DashboardApp')));
// Main
const Profile = Loadable(lazy(() => import('./pages/Profile/Profile')));
const NotFound = Loadable(lazy(() => import('./pages/Page404')));

const CmsContact = Loadable(lazy(() => import('./pages/contact page/CmsContact')));
