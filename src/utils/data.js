import A from './../assets/A.png';
import ALTMBA from './../assets/altmba.png';
import ATTLogo from './../assets/ATTLogo.png';
import IITKLogo from '../assets/IITKLogo.jpg';
import B from './../assets/B.png';

import BostonUniLogo from './../assets/BostonUniLogo.png';
import yaleLOGO from './../assets/yaleLOGO.png';
import colomboLOGO from './../assets/colomboLOGO.png';
import CS from './../assets/CS.png';
import DA from './../assets/DA.png';
import DEV from './../assets/DEV.png';
import GeorgiaTechUniLogo from './../assets/GeorgiaTechUniLogo.png';
import HL from './../assets/HL.png';
import HarvardUniLogo from './../assets/HarvardUniLogo.png';
import metaLOGO from './../assets/metaLOGO.png';
import udemyLOGO from './../assets/udemyLOGO.png';
import LSH from './../assets/LSH.svg';
import M from './../assets/M.png';
import accentureLOGO from './../assets/accentureLOGO.png';
import awsLOGO from '../assets/awsLOGO.png';
import O from './../assets/O.png';
import PMPInstLogo from './../assets/PMPInstLogo.jpg';
import SENG from './../assets/SENG.png';
import SO from './../assets/SO.png';
import UdacityLogo from './../assets/UdacityLogo.png';
import UdemyLogo from './../assets/UdemyLogo.png';
import UL from './../assets/UL.svg';
import UniAuklandLogo from './../assets/UniAuklandLogo.jpg';
import UniNewcastleLogo from './../assets/UniNewcastleLogo.jpeg';
import GT from './../assets/gatech.png';
import dataScience from '../assets/subjects/20402.jpg';
import scienceAndEngin from '../assets/subjects/female-engineer-in-laboratory-3861449.jpg';
import socialStudies from '../assets/subjects/happy-ethnic-woman-sitting-at-table-with-laptop-3769021.jpg';
import computerScience from '../assets/subjects/Image-2.jpg';
import art from '../assets/subjects/Image-3.jpg';
import business from '../assets/subjects/Image-4.jpg';
import mathImage from '../assets/subjects/Image-16.jpg';
import developer from '../assets/subjects/person-looking-at-phone-and-at-macbook-pro-1181244.jpg';
import health from '../assets/subjects/photo-of-woman-practicing-yoga-3820320.jpg';
import PepGra from '../assets/PepGra.png';
import CU from '../assets/coventryUniversity.svg';
import Duke from '../assets/Duke.png';
import ThunderLogo from '../assets/ThunderLogo.png';
// icons
import affiliate from '../assets/furimg/affiliate.png';
import dataAnalyst from '../assets/furimg/dataAnalyst.png';
import leadership from '../assets/furimg/leadership.png';
import software from '../assets/furimg/software.png';
import ux from '../assets/furimg/ux.png';
import video from '../assets/furimg/video.png';
import basic from '../assets/furimg/basic.png';
import communication from '../assets/furimg/communication.png';
import contentCreation from '../assets/furimg/content-creation.png';

export const subjectsData = [
  {
    name: 'Computer Science',
    code: 'CS',
    content: '',
    image: CS,
    tile: computerScience,
  },
  {
    name: 'Business',
    code: 'B',
    content: '',
    image: B,
    tile: business,
  },
  {
    name: 'Arts & Design',
    code: 'A',
    content: '',
    image: A,
    tile: art,
  },
  {
    name: 'Data Science',
    code: 'DA',
    content: '',
    image: DA,
    tile: dataScience,
  },
  {
    name: 'Health & Lifestyle',
    code: 'HL',
    content: '',
    image: HL,
    tile: health,
  },
  {
    name: 'Science & Engineering',
    code: 'SENG',
    content: '',
    image: SENG,
    tile: scienceAndEngin,
  },
  {
    name: 'Social Studies',
    code: 'SO',
    content: '',
    image: SO,
    tile: socialStudies,
  },
  {
    name: 'Developers/Programming',
    code: 'DEV',
    content: '',
    image: DEV,
    tile: developer,
  },
  {
    name: 'Math',
    code: 'M',
    content: '',
    image: M,
    tile: mathImage,
  },
  {
    name: 'Others',
    code: 'O',
    content: '',
    image: O,
  },
];

export const FRD = [
  {
    name: 'Data Visualization: Data Dashboards and Storytelling with Tableau',
    university: 'Coventry University',
    provider: 'Future Learn',
    icon: dataAnalyst,
    url: '/FutureLearn/f79e010c-4b42-45e4-8a71-0b47142cd953',
  },
  {
    name: 'The Complete Guide to Partnership Marketing Course',
    university: 'Udemy',
    provider: 'Udemy',
    icon: affiliate,
    url: '/Udemy/f966445c-9ec6-4772-9fee-7fff9307d17c',
  },
  {
    name: 'How to Create Great Online Content',
    university: 'University of Leeds',
    provider: 'Future Learn',
    icon: contentCreation,
    url: '/FutureLearn/ec353cf3-935a-4f45-bcd7-3eedda8d4a0b',
  },
  {
    name: 'Improve Communication: Speak Smoothly, Clearly & Confidently',
    university: 'Udemy',
    provider: 'Udemy',
    icon: communication,
    url: '/Udemy/88d4bd0e-c21d-4143-9006-682e61ad2979',
  },
  {
    name: 'Introduction to User Experience Design',
    university: 'Georgia Institute of Technology',
    provider: 'Coursera',
    icon: ux,
    url: '/Coursera/ed0fb229-794c-47b1-afa0-b02a59b71781',
  },
  {
    name: 'Video Production: 10 Ways to Instantly Improve Your Videos',
    university: 'Udemy',
    provider: 'Udemy',
    icon: video,
    url: '/Udemy/e96fb258-fd65-4d11-8fe3-1c3f52b80c15',
  },
  {
    name: 'Managing Emotions in Times of Uncertainty & Stress',
    university: 'Yale University',
    provider: 'Coursera',
    icon: basic,
    url: '/Coursera/667ff468-f4ee-41bf-b555-7b0913256202',
  },
  {
    name: 'Complete Google Workspace (G Suite), Beginner - Advanced',
    university: 'Udemy',
    provider: 'Udemy',
    icon: basic,
    url: '/Udemy/90ff991e-98db-4478-8424-ec220657a5b5',
  },
  {
    name: 'Excel for Everyone: Core Foundations',
    university: 'edX',
    provider: 'edX',
    icon: basic,
    url: '/edX/920f55b7-9ce4-446d-a8c6-161717a4aaa6',
  },
];

export const degreeData = [
  {
    name: 'Facebook Marketing Analytics Professional Certificate',
    university: 'Facebook Meta Course',
    image: metaLOGO,
    provider: 'Coursera',
    url: '/Coursera/a7fdedb3-b7f2-43e0-a279-205ebeb8cdf6',
  },
  {
    name: 'Salesforce Certified Platform Developer I',
    university: 'Udemy Online Portal',
    provider: 'Udemy',
    image: udemyLOGO,
    url: '/Udemy/33cfdc17-d3b7-4ab1-97d7-0482a97c9ee5',
  },
  {
    name: 'AWS: Machine Learning Foundations',
    university: 'AWS Academy',
    provider: 'Futre Learn',
    image: awsLOGO,
    url: '/FutureLearn/19188453-5506-487a-b2fe-9b8075424e96',
  },
  {
    name: 'Digital Skills: Digital Marketing',
    university: 'Accenture Company',
    provider: 'Futre Learn',
    image: accentureLOGO,
    url: '/FutureLearn/2b6213d0-df82-4988-93b4-2d3bd05b331d',
  },
  {
    name: 'Masters in Business Administration',
    university: 'Boston University',
    provider: 'edX',
    image: BostonUniLogo,
    url: '',
    data: {
      name: 'Masters in Business Administration',
      university: 'Boston University',
      provider: 'edX',
      outcome: `<p>The BU Questrom Online MBA requires 45 credit-hours of coursework comprised of six 7.5-credit semester-long integrated modules. The curriculum is designed so that you take one module a semester. No more worrying about what courses to take and when.</p>
      <p>Each module is the workload equivalent of two and a half individual core courses. However, with this innovative program design, the integration within each module makes you feel like you’re taking just one.</p>
      <p>Our modules provide an integrated perspective on the key capabilities needed to make management decisions in a complex global business ecosystem. We’ve designed each module to weave together business concepts. Instead of studying business in silos - with separate courses in accounting, finance, marketing, supply chain, etc. - you’ll discover the interdependent nature of these core business disciplines. In other words, you’ll study business and business management the way you experience it every day in the real world: as complex interconnected challenges. For example, how do you launch a new product; is your business ready to expand in scale and scope; how can your organization create value for the world?</p>
      <p>So, while you won’t see individual courses in our design, you can be assured that you are learning the same core concepts expected from the globally-recognized MBA degree.</p>
      <p>
      </p><table style="border-collapse: collapse;  width: 100%;">
        <tbody><tr>
              <th style="border: 1px solid #B7002B; padding: 8px; text-align: left; background-color: #B7002B; color: white;">ONLINE MBA LAUNCH<br>(O CREDITS)</th>
        </tr>
        <tr>
          <td style="background-color: white; border: 1px solid #B7002B; padding: 8px;">
            <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
              <li>Introduction to the edX learning platform</li>
              <li>Orientation to BU and Questrom School of Business</li>
                  <li>How to be successful in an online learning environment</li>
            </ul>
          </td>
        </tr>
      </tbody></table>
      <p></p>
      <p>
      </p><table style="border-collapse: collapse; width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #63C4AF; padding: 8px; text-align: left; background-color: #63C4AF; color: white;">MODULE 1: CREATING VALUE FOR BUSINESS &amp; SOCIETY<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #63C4AF; padding: 8px;">
              <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Role of business in society</li>
                    <li>Economic and socio-political foundations of business</li>
                    <li>Impact of digital transformation and information</li>
                    <li>Global business trends</li>
                </ul>
            </td>
          </tr>
      </tbody></table>
      <p></p>
      <p>
        </p><table style="border-collapse: collapse;  width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #FF7900; padding: 8px; text-align: left; background-color: #FF7900; color: white;">MODULE 2: MANAGING PERFORMANCE WITH DATA<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #FF7900; padding: 8px;">
                  <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Analyze financial statements and metrics</li>              
                    <li>Financial analysis for business planning</li>
                    <li>Use statistics and data to drive business decisions</li>
                    <li>Metrics for financial, marketing, and operational performance</li>
                </ul>
            </td>
          </tr>
        </tbody></table>
      <p></p>
      <p>
        </p><table style="border-collapse: collapse;  width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #CA005D; padding: 8px; text-align: left; background-color: #CA005D; color: white;">MODULE 3: LEADING WITH INTEGRITY<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #CA005D; padding: 8px;">
                  <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Develop a global and diverse work-force</li>              
                    <li>Lead through change</li>
                    <li>Manage conflict, power, and politics</li>
                    <li>Leverage high-performance teams</li>
                </ul>
            </td>
          </tr>
        </tbody></table>
      <p></p>
      <p>
        </p><table style="border-collapse: collapse;  width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #69BE28; padding: 8px; text-align: left; background-color: #69BE28; color: white;">MODULE 4: MANAGING RISK<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #69BE28; padding: 8px;">
                  <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Assess environmental, social, political, and regulatory risk</li>     
                    <li>Financial risk management</li>  
                    <li>Develop processes for measuring and monitoring risk</li>   
                    <li>Manage operational risk</li>    
                </ul>
            </td>
          </tr>
        </tbody></table>
      <p></p>
      <p>
        </p><table style="border-collapse: collapse;  width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #009FDA; padding: 8px; text-align: left; background-color: #009FDA; color: white;">MODULE 5: LEVERAGING GLOBAL OPPORTUNITIES<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #009FDA; padding: 8px;">
                  <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Optimize the global value chain</li>
                    <li>Develop competitive strategies</li>
                    <li>Manage the marketing mix for target segments</li>
                    <li>Analyze global markets and trade systems</li>
                </ul>
            </td>
          </tr>
        </tbody></table>
      <p></p>
      <p>
        </p><table style="border-collapse: collapse;  width: 100%;">
          <tbody><tr>
              <th style="border: 1px solid #CC0000; padding: 8px; text-align: left; background-color: #CC0000; color: white;">MODULE 6: FOSTERING AN INNOVATIVE MINDSET<br>(7.5 CREDITS)</th>
          </tr>
          <tr>
              <td style="background-color: white; border: 1px solid #CC0000; padding: 8px;">
                  <ul style="margin-block-start: 0em;  margin-block-end: 0em;">
                    <li>Apply principles of design-thinking</li>
                    <li>Manage the innovation portfolio</li>
                    <li>Analyze growth opportunities</li>
                    <li>Drive corporate and entrepreneurial innovation</li>
                </ul>
            </td>
          </tr>
        </tbody></table>
      <p></p>
        <p><i>Note: We expect each module will require approximately 15 to 20 hours of work per week.</i></p>
        <p>Within each module you will also apply learning concepts and skills to your current or previous work, acquire capability-relevant management communications skills, advance your global team leadership acumen, and enhance your career development toolkit.<br>Each module ends with an action-learning experience and the program culminates in a comprehensive capstone project.</p>
        <p>Modules are offered during the fall (September-December), spring (January-May), and summer (May-August) semesters. Taking the modules in five consecutive semesters allows you to complete your MBA in as few as 24 months while attending part-time.</p>`,
      prerequisites:
        '<div>Requires a bachelor’s degree from an accredited university.</div>',
      startDate: 'September 2, 2020',
      duration: '2-3 years',
      price: '24000',
      enroll:
        'https://www.edx.org/masters/online-master-business-administration-mba-bux',
    },
  },
  {
    name: 'Master’s Degree in Analytics',
    university: 'Georgia Tech',
    provider: 'edX',
    image: GeorgiaTechUniLogo,
    url: '',
    data: {
      name: 'Master’s Degree in Analytics',
      university: 'Georgia Tech',
      provider: 'edX',
      outcome: `<div><p>The Online Master of Science Analytics degree requires 36 hours of coursework. First, 15 hours of core coursework on big data analytics, visual analytics, computing statistics, and operational research essentials. An additional 15 hours of electives allow students to choose an area of specialization in one of three tracks.</p>
      <p>
      Full curriculum breakdown:
      </p><ul><li>Introductory core – 9 hours</li>
      <li>Advanced core – 6 hours</li>
      <li>Statistics elective – 6 hours</li>
      <li>Operations elective – 3 hours</li>
      <li>Track electives – 6 hours</li>
      <li>Practicum – 6 hours</li></ul>
      <p></p>
      <p>
      Students will have the flexibility to focus on a specific area of interest by selecting to concentrate on one of three tracks. Tracks include:
      </p><ul><li>Analytical Tools</li>
      <li>Business Analytics</li>
      <li>Computational Data Analytics</li></ul>
      <p></p>
      <p>Like on-campus students, online learners will complete a 6 credit hour applied analytics practicum with an outside company.</p></div>`,
      prerequisites: `<p>All OMS Analytics applicants are expected to have met the following prerequisite criteria:
      </p><ul>
      <li>Hold an undergraduate Bachelor’s degree or equivalent from an accredited institution.</li>
      <li>Possess knowledge of at least one of the following college-level courses or equivalent:
      <ul>
      <li>Probability/Statistics</li>
      <li>Computer Programming in Python at the level of CS1301</li>
      <li>Calculus and basic linear algebra</li></ul>
      </li><li>Applicants who are selected for admission will be conditionally admitted into the degree program and must pass the two OMS Analytics foundational courses with a grade of B or better to be fully admitted. Students do not need to take these foundational courses before registering for other core or elective courses. However, we recommend students take at least one foundational course per semester in which they are enrolled until they are fully admitted to Georgia Tech.`,
      full_description: `<div><p>The Georgia Tech Online Master of Science in Analytics (OMS Analytics) is a multidisciplinary degree in collaboration with Georgia Tech’s College of Engineering, College of Computing, and Scheller College of Business.</p>
      <p>The top 10-ranked master’s program challenges students with the same curriculum and rigor as its on-campus Analytics counterpart, all with tuition for under $10,000 USD. </p>
      
      <p>This fully online program enables students to take a deep dive into analytics and choose from 3 specialized tracks.
      </p><ul><li>Analytical Tools</li>
      <li>Business Analytics</li>
      <li>Computation Data Analytics</li></ul><p></p>
      
      <p>Designed for your schedule, this online master’s program is for students seeking greater flexibility and can be completed part-time in two to three years.</p>
      
      <p>OMS Analytics equips you with the insight and multidisciplinary skills needed to succeed in today’s analytics world while offering you the prestige, affordability, flexibility you want in a master’s degree.</p>
      
      <p>Gain a credential that commands attention with the Georgia Tech Online Master of Science in Analytics.</p></div>`,
      price: '9900',
      startDate: 'Fall 2020',
      duration: '1 year',
      enroll:
        'https://www.edx.org/masters/online-master-science-analytics-georgia-tech',
    },
  },
  {
    name: 'altMBA w/Seth Godin',
    university: 'Seth Godin',
    image: ALTMBA,
    provider: 'altMba',
    url: '/altmba',
  },
];

export const freeCourses = [
  {
    name: "CS50's Introduction to Computer Science",
    university: 'Harvard University',
    provider: 'edX',
    image: HarvardUniLogo,
    url: '/edX/afbe4cc4-a020-4006-8502-8fd70c3e84a2',
  },
  {
    name: 'Introduction to Cryptocurrencies and Blockchain',
    university:
      'Vizitech Solutions, Kiran Vaidya, FTB Courses, Tech Enthusiast',
    provider: 'Udemy',
    image: UdemyLogo,
    url: '/Udemy/cf2360fd-2683-4a79-9ff3-cc728f7ace30',
  },
  {
    name: 'Digital Marketing Fundamentals with Live Projects',
    university: 'Udemy',
    provider: 'Udemy',
    image: UdemyLogo,
    url: '/Udemy/1f5a2af3-edb6-4bfd-a4b5-5b2b285131a7',
  },
];

export const trendingData = [
  {
    name: 'Online MBA Alternative - The modMBA',
    university: 'COURSE ENVY',
    provider: 'Udemy',
    image: UdemyLogo,
    url: '/Udemy/43ff9067-66ab-46cc-9952-4adcc75127c3',
  },
  {
    name: 'Machine Learning for Data Science and Analytics',
    university: 'Free online courses from Columbia University',
    provider: 'edX',
    image: colomboLOGO,
    url: '/edX/9c7844d5-37e2-412c-85df-40f1f471fd4e',
  },
  {
    name: 'The Science of Well-Being',
    university: 'Yale University',
    provider: 'Coursera',
    image: yaleLOGO,
    url: '/Coursera/ae886a74-808e-4f30-a8df-9696f23414bc',
  },
];

export const exclusiveCourses = [
  {
    name: 'Certificate in Healthcare Analytics for Decision-makers',
    university: 'Pepperdine Graziadio Business School',
    image: PepGra,
    provider: 'DHGE',
    url: '',
    data: {
      name: `<span>Certificate in Healthcare Analytics</span><br/>`,
      university: 'Pepperdine Graziadio Business School',
      provider: 'DigitalHealth',
      overView: `<span>Data is everywhere in healthcare. Both clinical and non-clinical work relies heavily on data to drive performance and improve outcomes. Having a solid understanding of healthcare analytics is key to making an impact on healthcare organizations. Harnessing the power of healthcare data analytics empowers leaders â€” in all fields of care, not just in Healthcare Informatics departments” to make data-driven decisions that lead to improved quality, cost, and care.</span><br />
                  <span>Participants of the Certificate in Healthcare Analytics for Decision-Makers will gain experience contemplating data, determining informed results, and making evidence-based and data-backed decisions. They will learn to ask the right questions, evaluate data collection schemes, and interpret complex data sets from various sources. Expert faculty will demonstrate how to apply theories of statistical models and utilize evaluation methodologies and the program is facilitator-led to ensure student success. In only eight weeks, participants will become empowered to leverage healthcare analytics in their organization, influence important decisions, and achieve better results.</span>`,
      bulletPoints: `<table style="border-collapse: collapse;  width: 100%; margin-top:30px">
      <tbody>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">1-1</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>support from experienced facilitators</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px;padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">8</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>topics to learn how to leverage healthcare analytics in your organization</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#21 </h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>ranking in 2019 for Best Online MBA - by U.S. News & World Report</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">50+</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>years of educating students in the field of business</p>
          </td>
      </tr>
      </tbody></table>`,
      curriculum: `The Certificate in Healthcare Leadership focuses on all leadership functions. It is split into the following three pillars.`,
      curriculumDetails: `<p></p>
                          <ul style="font-size:12px">
                            <li>Unit 1: Introduction to Descriptive Analytics</li>
                            <li>Unit 2: Making Inferences and Practical Probability Theory</li>
                            <li>Unit 3: Relationships Amongst Variables: Introduction to Correlation and Regression</li>
                            <li>Unit 4: Multiple Regression</li>
                            <li>Unit 5: Forecasting</li>
                            <li>Unit 6: Framework for Decision-Making</li>
                            <li>Unit 7: Finding Optimized Solutions in Healthcare, Part 1</li>
                            <li>Unit 8: Finding Optimized Solutions in Healthcare, Part 2</li>
                          </ul>`,
      outcome: `<p>Participants of the Certificate in Healthcare Analytics for Decision-Makers will earn the following skills:</p>
                <ul>
                  <li>Ask the correct questions prior to healthcare data collection and analysis, and search for possible alternative explanations upon completion.</li>
                  <li>Identify biases that may corrupt the decision-making process and develop mechanisms for avoiding those biases.<li></li>
                  <li>Use spreadsheets to model mathematics</li>
                  <li>Understand practical statistical models that can be used to forecast the future</li>
                  <li>Identify significant group differences and gauge the practical value of those differences</li>
                  <li>Create rational frameworks to identify, embrace, integrate, and mitigate risk in the decision-making process</li>
                  <li>Understand mathematical theories of optimization used to determine the best solutions to perplexing problems</li>
                  <li>Create accurate, compelling, and convincing presentations to ensure implementation of analysts™ recommendations</li>
                  <li>Think critically about healthcare issues and use an integrated approach when making decisions, leveraging expertise in all substantive areas</li>
              </ul>`,
      whyRequired: `<p>This program is ideal for consumers and producers of healthcare analytics data. As an online healthcare data analytics certificate, it was designed for current and prospective decision-makers who are interested in gaining working knowledge of the topic through participating in a flexible and comprehensive online course, rather than gaining the in-depth knowledge a degree in the field would offer. Participants need little to no background in data science. Groups that might especially benefit from this program are:</p>
                    <ul>
                      <li>Leadership and business developers looking to expand business impact</li>
                      <li>Healthcare professionals new to data analysis and data science</li>
                      <li>Analysts or recent graduates new to healthcare</li>
                      <li>Healthcare analysts looking to refresh or expand their knowledge</li>
                    </ul>`,
      providerInfoName: 'About the Pepperdine Graziadio Business School',
      providerInfo: `<p>For the last 50 years, the Pepperdine Graziadio Business School has challenged individuals to think boldly and drive meaningful change within their industries and communities. Dedicated to developing Best for the World Leaders, the Graziadio School offers a comprehensive range of MBA, MS, executive, and doctoral degree programs grounded in integrity, innovation, and entrepreneurship. The Graziadio School advances experiential learning through small classes with distinguished faculty that stimulate critical thinking and meaningful connection, inspiring students and working professionals to realize their greatest potential as value-centered leaders.</p>
                      <p>Pepperdine University is a private institution founded in 1937. It has a total undergraduate enrollment of 3,604. Its setting is suburban, with the Malibu campus spanning 830 acres. In the 2019 edition of Best Colleges, Pepperdine University ranked 47 on the list of National Universities</p>`,
      prerequisites:
        '<div>Requires a bachelor’s degree from an accredited university.</div>',
      startDate: null,
      duration: '8 weeks',
      price: '2,24,625',
      enroll:
        'https://dhge.org/our-programs/healthcare-analytics-certificate-pepperdine-graziadio',
    },
  },
  {
    name: 'Certificate in Healthcare Leadership',
    university: 'Duke CE',
    provider: 'DHGE',
    image: Duke,
    url: '',
    data: {
      name: `<span>Certificate in Healthcare Leadership</span><br/>`,
      university: 'Duke CE',
      provider: 'DigitalHealth',
      overView: `<span>The Certificate in Healthcare Leadership, developed in partnership with Duke Corporate Education (Duke CE, part of Duke University), empowers leaders with the mindset, skills, and confidence to lead in a manner that is authentic to who they are.</span><br />
                  <span>Designed for healthcare professionals seeking to lead in an effective way, this program teaches leaders to evaluate themselves, improve communication, build relationships, and motivate others. Using a framework developed in collaboration with industry experts and world-leading instructors, students will learn to identify techniques and leverage opportunities to increase influence across a matrixed organization. Through this online certificate, learners will build their leadership style and confidence to elevate performance and maximize impact.</span>`,
      bulletPoints: `<table style="border-collapse: collapse;  width: 100%; margin-top:30px">
      <tbody>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#1</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>ranking among Custom Executive Education Providers in North America in the Financial Times (Duke CE)</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px;padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">300,000+</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>leaders engaged in different Duke CE programs in over 80 countries</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">14+</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>industry leaders from a range of healthcare backgrounds are involved in the development of this certificate program</p>
          </td>
      </tr>
    </tbody></table>`,

      curriculum: `The Certificate in Healthcare Leadership focuses on all leadership functions. It is split into the following three pillars.`,
      curriculumDetails: `<p></p>
                            <p style="font-size:12px">Module 1: Leading Self</p>
                            <ul style="font-size:12px">
                            <li>Unit 1: Becoming an Authentic Leader</li>
                            <li>Unit 2: Increasing Energy, Effectiveness, and Impact</li>
                            <li>Unit 3: Improving Communications and Building Relationships</li>
                          </ul>
                          <p></p>
                            <p style="font-size:12px">Module 2: Leading Others</p>
                            <ul style="font-size:12px">
                            <li>Unit 4: Motivating and Coaching Others</li>
                            <li>Unit 5: Aligning People and Work</li>
                            <li>Unit 6: Addressing Performance Issues</li>
                            <li>Unit 7: Elevating Team Effectiveness</li>
                          </ul>
                          <p></p>
                            <p style="font-size:12px">Module 3: Leading Organizations</p>
                            <ul style="font-size:12px">
                            <li>Unit 8: Implementing Strategic Plans</li>
                            <li>Unit 9: Managing the Finances</li>
                            <li>Unit 10: When Change Happens</li>
                            <li>Unit 11: Positioning for the Future: Communication and Influence</li>
                            <li>Unit 12: Reflecting and Planning for Continuous Improvement</li>
                          </ul>`,
      outcome: `<p>Participants of the Certificate in Healthcare Leadership will earn the following skills:</p>
                <ul>
                  <li>Increase self-awareness of personal preferences and styles and how to align with messages, habits and behaviors that project an authentic and effective leadership identity.</li>
                  <li>Learn the value of strong relationships and networks and how to build them through communication and collaboration that increase trust and understanding.</li>
                  <li>and enhance the performance of others by defining clear goals and priorities, and employing key leadership levers such as motivation, coaching, delegation and feedback.</li>
                  <li>Align with the overall operations of the organization by understanding, translating and implementing strategic and financial plans at the team level and identifying ways to positively contribute to business performance.</li>
                  <li>Develop leadership techniques to increase their level of influence and guide both the process of change and people transitions as healthcare continues to evolve.</li>
              </ul>`,
      whyRequired: `<p>The Healthcare Leadership certificate is designed for:</p>
                    <ul>
                      <li>Aspiring or entry-level leaders working across diverse healthcare disciplines such as pharmacy, radiology, occupational therapy, etc.</li>
                      <li>Experienced managers or directors who want to elevate their existing skills and learn more about emerging leadership trends</li>
                    </ul>`,
      providerInfoName: 'About the Duke CE',
      providerInfo: `<p>Part of Duke University, Duke Corporate Education (Duke CE) is the premier global provider of leadership solutions in context. They deliver leadership development to the global 1000 organizations and governments around the world to get their leaders and their business ready for what’s next.</p>
                      <p>The Financial Times has ranked Duke Corporate Education the top custom provider of executive education headquartered in the US for two decades.</p>`,
      prerequisites:
        '<div>Requires a bachelor’s degree from an accredited university.</div>',
      startDate: null,
      duration: '12 weeks',
      price: '1,49,625',
      enroll:
        'https://dhge.org/our-programs/certificate-in-healthcare-leadership',
    },
  },
  {
    name: 'Certificate in Healthcare Marketing',
    university: 'Pepperdine Graziadio Business School',
    provider: 'DHGE',
    image: PepGra,
    url: '',
    data: {
      name: `<span>Certificate in Healthcare Marketing</span><br/>`,
      university: 'Pepperdine Graziadio Business School',
      provider: 'DigitalHealth',
      overView: `<span>The healthcare industry has shifted from volume-based care to value-based care: More than ever, healthcare organizations have to prioritize patient engagement and health outcomes. Patients have become more involved with their own health. Providers must adjust how they engage their target audience to remain relevant and ensure success — in short: They must adopt and lead in a patient-centric approach.</span><br />
                  <span>The Certificate in Healthcare Marketing was designed to equip healthcare professionals with key marketing concepts, tools, and case studies so they can transform patient interactions into positive customer experiences. Developed in collaboration with the Pepperdine Graziadio Business School and with industry experts, the courses are specifically developed for medical marketing and healthcare marketing, which is unlike marketing in any other field, as the strategies are impacting consumer’s health.</span>`,
      bulletPoints: `<table style="border-collapse: collapse;  width: 100%; margin-top:30px">
      <tbody>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">1-1</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>live support from experienced facilitators in the U.S. News & World Report 2019</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">9</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>units taking you through the marketing essentials</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px;padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#21</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>ranking in 2019 for Best Online MBA by U.S. News & World Report</p>
          </td>
      </tr>
      </tbody></table>`,

      curriculum: `In nine weeks, the certificate covers the following topics in a context of healthcare marketing and medical marketing:`,
      curriculumDetails: `<p></p><ul style="font-size:12px">
                            <li>Unit 1: Introduction to Healthcare Marketing</li>
                            <li>Unit 2: Marketing Insights</li>
                            <li>Unit 3: Customer Assessment</li>
                            <li>Unit 4: Marketing Segmentation and Targeting</li>
                            <li>Unit 5: Brand Development</li>
                            <li>Unit 6: Creating Value — Product, Service, and Pricing Strategy</li>
                            <li>Unit 7: Delivering Customer Value Through Distribution</li>
                            <li>Unit 8: Value-Promotional Strategy and Customer Loyalty</li>
                            <li>Unit 9: Monitoring the Plan</li>
                          </ul>`,
      outcome: `<p>Upon completion of this nine-week online medical marketing course, graduates will be able to:</p>
                <ul>
                  <li>Assess the effectiveness of a healthcare marketing plan</li>
                  <li>Interpret and present relevant data (quantitative and qualitative) to support marketing recommendations and decisions</li>
                  <li>Create viable, executable marketing strategies and tactics for a healthcare organization</li>
                </ul>`,
      whyRequired: `<p>The Certificate in Healthcare Marketing is designed for various professionals wanting to learn more about a patient-centric healthcare organization and apply new innovative marketing approaches.</p>
                    <p>Specifically, it can benefit:</p>
                    <ul>
                      <li>Marketing professionals and recent graduates new to healthcare</li>
                      <li>Healthcare professionals new to marketing</li>
                      <li>Healthcare marketing professionals wanting to connect with peers</li>
                      <li>Leadership and business developers looking to learn new marketing strategies</li>
                    </ul>`,
      providerInfoName: 'About the Pepperdine Graziadio Business School',
      providerInfo: `<p>For the last 50 years, the Pepperdine Graziadio Business School has challenged individuals to think boldly and drive meaningful change within their industries and communities. Dedicated to developing Best for the World Leaders, the Graziadio School offers a comprehensive range of MBA, MS, executive, and doctoral degree programs grounded in integrity, innovation, and entrepreneurship. The Graziadio School advances experiential learning through small classes with distinguished faculty that stimulate critical thinking and meaningful connection, inspiring students and working professionals to realize their greatest potential as value-centered leaders.</p>
                      <p>Pepperdine University is a private institution founded in 1937. It has a total undergraduate enrollment of 3,604. Its setting is suburban, with the Malibu campus spanning 830 acres. In the 2019 edition of Best Colleges, Pepperdine University ranked 47 on the list of National Universities. The Pepperdine Online MBA ranks No. 21 for Best Online MBA in the U.S. News & World Report 2019.</p>`,
      prerequisites:
        '<div>Requires a bachelor’s degree from an accredited university.</div>',
      startDate: null,
      duration: '9 weeks',
      price: '2,24,625',
      enroll:
        'https://dhge.org/our-programs/healthcare-marketing-certificate-pepperdine-graziadio',
    },
  },
  {
    name: 'Certificate in Innovation in Healthcare Management',
    university:
      'Thunderbird School of Global Management, a unit of Arizona State University Knowledge Enterprise',
    provider: 'DHGE',
    image: ThunderLogo,
    url: '',
    data: {
      name: `<span>Certificate in Innovation</span><br/>
              <span>in Healthcare Management</span>`,
      university: 'Thunderbird School of Global Management',
      provider: 'DigitalHealth',
      overView: `<span>Healthcare has experienced enormous leaps of innovation over the past several decades with advances in technology such as artificial intelligence, better therapeutic options, and improved diagnostics due to breakthroughs in data analysis and health informatics. The majority of this innovation has been focused on the development of new drugs, medical devices, diagnostic procedures, and therapies” now is the time to bring the delivery of healthcare services up to par with the modern world. An innovative mindset in healthcare is needed to improve quality, enhance the patient experience, reduce harm, improve access, increase efficiency, eliminate waste, and lower costs.</span>
                  <span>The Certificate in Innovation in Healthcare Management empowers healthcare industry professionals ”from senior executives to aspiring managers” to foster effective, innovative environments and deliver results from new innovations.</span>`,
      bulletPoints: `<table style="border-collapse: collapse;  width: 100%; margin-top:30px">
      <tbody>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#1</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>Most Innovative School in the U.S. (ASU) in the U.S. News & World Report 2016, 2017, 2018, 2019</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px;padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#1</h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>Internationalism of Alumni in The Economist 2014</p>
          </td>
      </tr>
      <tr>
          <td style="width:20%; padding-bottom: 33.5px; padding-right:8.5px">
            <h1 style="font-size: 51px;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.29;
            letter-spacing: normal;
            color: #0d9ca4;
            text-align: right;
            font-weight: 700;">#15 </h1>
          </td>
          <td style="padding-bottom: 33.5px">
              <p>Overall Executive Education in the Financial Times 2015</p>
          </td>
      </tr>
    </tbody></table>`,
      curriculum: `Students who undertake our healthcare innovation course will be introduced to concepts and definitions which include, but are not limited to, ideation and evaluation of ideas, identifying ways to turn innovative ideas into valuable strategies and business models, and ultimately delivering results from innovation.`,
      curriculumDetails: `<p></p><ul style="font-size:12px">
                            <li>Unit 1: Megatrends in Healthcare</li>
                            <li>Unit 2: Ideation Best Practices</li>
                            <li>Unit 3: Effective Validation</li>
                            <li>Unit 4: Understanding Resource Constraints</li>
                            <li>Unit 5: Planning for New Innovations</li>
                            <li>Unit 6: Creating Valuable Advantages</li>
                            <li>Unit 7: Winning Adoption for New Ideas</li>
                            <li>Unit 8: Delivering Rapid Results</li>
                          </ul>`,
      outcome: `<p>Participants of the Certificate in Innovation in Healthcare Management will earn the following skills:</p>
                <ul>
                  <li>Describe key trends in the healthcare industry</li>
                  <li>Recognize key environmental constraints impacting healthcare providers and healthcare service companies</li>
                  <li>Identify opportunities for innovation in the healthcare industry</li>
                  <li>Apply and summarize effective validation strategies for healthcare innovations</li>
                  <li>Identify ways to turn innovative ideas into valuable strategies and business models</li>
                  <li>Recognize planning models and payoff measurements for new innovation projects</li>
                  <li>Identify resource needs for new innovation projects</li>
                  <li>Outline techniques for encouraging others to adopt new innovations</li>
                  <li>Create a 90-day delivery plan that includes keys to delivering intended results</li>
              </ul>`,
      whyRequired: `<p>This online course empowers healthcare industry professionals, from senior executives to aspiring managers, to foster effective innovation environments and deliver results from new innovations. Groups that could especially benefit from this certificate program are</p>
                    <ul>
                      <li>Executive leadership</li>
                      <li>Mid- to senior-level managers</li>
                      <li>Personnel with budget, management, or team-level decision responsibility</li>
                      <li>High-potential management candidates</li>
                    </ul>`,
      providerInfoName: 'About the Duke CE',
      providerInfo: `<p>The Thunderbird School of Global Management is a unit of the Arizona State University Knowledge Enterprise. Combined, they hold numerous rankings such as a No. 1 Master's in Management from the Times Higher Education/Wall Street Journal Business Schools Report 2019; No. 1 for Public University of Choice for International Students (ASU) in the 2018 Open Doors Report by the Institute of International Education; No. 1 for Most Innovative School in the U.S. (ASU) in the U.S. News & World Report 2016, 2017, 2018, 2019; and No. 1 for Internationalism of Alumni; among others.</p>
                      <p>Thunderbird School of Global Management is the vanguard of global leadership, management, and business education for the Fourth Industrial Revolution. They prepare future-ready leaders, managers, entrepreneurs and intrapreneurs across the private and public sectors who advance inclusive and sustainable prosperity worldwide.</p>`,
      prerequisites:
        '<div>Requires a bachelor’s degree from an accredited university.</div>',
      startDate: null,
      duration: '8 weeks',
      price: '2,24,625',
      enroll:
        'https://dhge.org/our-programs/innovation-healthcare-management-certificate-asu-thunderbird-school-of-global-management',
    },
  },
];
