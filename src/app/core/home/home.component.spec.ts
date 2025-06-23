import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IAgnibhaProfile } from '../../shared/interface/IAgnibhaProfile.interface';


// Create a mock IAgnibhaProfile object
const mockUser:IAgnibhaProfile = {
  "info": [
    {
      "key": "aboutMe",
      "value": "This is Agnibha, a Fullstack Web Developer from Kolkata. Currently, I'm working with Capgemini in Mumbai. I'm passionate about creating efficient and innovative software solutions and front end design."
    },
    {
      "key": "birthday",
      "value": "02-07-1997"
    },
    {
      "key": "phoneNumber",
      "value": "+91 7003652082"
    },
    {
      "key": "degree",
      "value": "B.Tech in C.S.E"
    },
    {
      "key": "languagesKnown",
      "value": "Bengali, English & Hindi"
    },
    {
      "key": "email",
      "value": "chowdhury.agnibha.98@gmail.com"
    },
    {
      "key": "description",
      "value": "Respectful self-motivator gifted at finding reliable solutions for software issues. Fluent in English, Hindi and Bengali and accustomed to working with cross-cultural, global teams, Excellent team player with a positive attitude."
    },
    {
      "key": "location",
      "value": "Kolkata, India"
    },
    {
      "key": "address",
      "value": "Dumdum, N.24 Parganas, West Bengal, India"
    },
    {
      "key": "pfp",
      "value": "https://dl.dropboxusercontent.com/scl/fi/udtl72jwtedsbb468z4cb/pfp-1.jpg?rlkey=az0vef77pv9nnulwy7wap0ba6&e=1&st=s52y18wr&dl=0"
    },
    {
      "key": "pfp",
      "value": "https://dl.dropboxusercontent.com/scl/fi/rgi0hmy3lwrpmmjkzue25/pfp2.webp?rlkey=msi83vv34exh1m3k4gglccuvh&e=1&st=qewdyqb5&dl=0"
    },
    {
      "key": "downloadResume",
      "value": "https://www.dropbox.com/pri/get/Resume/Agnibha_Chowdhury_Resume_V1.0-1-1.7z?_download_id=103131777549663380791905373386026580229779303003053199921231427916&_log_download_success=1&_notify_domain=www.dropbox.com&_subject_uid=2197944865&w=AAAwXQrpQo7qOdC_yn5a-Rd4264oRHwjdeLYbUrh_AQ_Zw"
    },
    {
      "key": "videoBG",
      "value": "https://dl.dropbox.com/scl/fi/nsx1q65a8pscb2wu5tpx2/cart.mp4?rlkey=wlka2s1r3oulvpm5yg9q5un3z&st=6nle2tb7&dl=0"
    }
  ],
  "meterics": [
    {
      "type": "itExperience",
      "count": 0,
      "description": "Year's of IT Experience",
      "svgImage": "assets/SVG/it.svg"
    },
    {
      "type": "hoursOfSupport",
      "count": 0,
      "description": "Hours of Support",
      "svgImage": "assets/SVG/time.svg"
    },
    {
      "type": "numberOfTechUsed",
      "count": 8,
      "description": "Number of Technologies Used",
      "svgImage": "assets/SVG/technology.svg"
    },
    {
      "type": "certificatesEarned",
      "count": 5,
      "description": "Certificates Earned",
      "svgImage": "assets/SVG/certificate.svg"
    }
  ],
  "skills": [
    {
      "type": "html",
      "description": "HTML",
      "percentage": 95
    },
    {
      "type": "css",
      "description": "CSS",
      "percentage": 90
    },
    {
      "type": "angular",
      "description": "Angular",
      "percentage": 80
    },
    {
      "type": ".netc#",
      "description": ".NET C#",
      "percentage": 70
    },
    {
      "type": "mssql",
      "description": "MS SQL",
      "percentage": 90
    },
    {
      "type": "restapi",
      "description": "RestAPI",
      "percentage": 80
    },
    {
      "type": "azure",
      "description": "Azure",
      "percentage": 70
    },
    {
      "type": "node",
      "description": "Node Js",
      "percentage": 60
    }
  ],
  "portfolios": [
    {
      "type": "Project",
      "projectName": "Login, Registration, Shooting Game and Paint",
      "imageLink": "https://dl.dropbox.com/scl/fi/0ecl5seydyiprcixdg9tm/LoginRegistration.JPG?rlkey=32famysl8l6unxo52lk2qab0o&st=qngr97pb&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/myMyself_F",
      "projectURL": "https://bymyself01-b55df.web.app",
      "description": "This project is a login registration website which also has a paint tool and also a shooting game with a scoreboard.",
      "technologiesUsed": "Angular, HTML, CSS, TS, Node js, Express js, Mongo DB",
      "projectDate": "2023-12-05"
    },
    {
      "type": "Project",
      "projectName": "My Portfolio",
      "imageLink": "https://dl.dropbox.com/scl/fi/6mmj5f9zha7ss4zv13587/MyResume.JPG?rlkey=wby9pbuly284odcoq3civdupg&st=2vywrwx8&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/MyPortfolioFrontend",
      "projectURL": "https://my-portfolio-1b0d8.web.app",
      "description": "This project is my portfolio website which has all my skills and my basic about me and has the ways to contact me.",
      "technologiesUsed": "Angular, HTML, CSS, TS, Node js, Express js, Mongo DB",
      "projectDate": "2024-06-08"
    },
    {
      "type": "Project",
      "projectName": "My Project Navigator",
      "imageLink": "https://dl.dropbox.com/scl/fi/g69v58ceszzkt2puupf9i/MyProjectNavigator.JPG?rlkey=yohxx6tn73u52j1fk7ogq8u97&st=7mnx8gcy&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/STARTUP-PAGE",
      "projectURL": "Not Hosted",
      "description": "This project is made to make my life easier in XTEL project in Capgemini. All the important links and tools are made to make my navigation easier.",
      "technologiesUsed": "HTML, CSS, JS",
      "projectDate": "2023-04-05"
    },
    {
      "type": "Project",
      "projectName": "Bits Of Me",
      "imageLink": "https://dl.dropboxusercontent.com/scl/fi/tv8x08q1rjs9by6kq5wzf/Bitsofm3.JPG?rlkey=79tqmqd7n9pni05nnnp1i5vmx&st=8u8fg5ge&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/BitsOfMe",
      "projectURL": "https://bitsofm3.web.app",
      "description": "A app to upload pics and text which will stay there for end of time.",
      "technologiesUsed": "Angular, HTML, CSS, TS, Node js, Express js, Mongo DB",
      "projectDate": "2025-03-01"
    },
    {
      "type": "Project",
      "projectName": "Electric Bill Payment System",
      "imageLink": "https://dl.dropboxusercontent.com/scl/fi/8mpjqhbk46f3b0gku012v/ElectricBillPaymentSystem.jpg?rlkey=vr04h5h83pwo22zx58kgws7sf&st=tkcng28j&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/ElectricBillPaymentSystem",
      "projectURL": "Not Hosted",
      "description": "My Final Year Project in college. Its not that good but it is added in this resume to show how much I have improved",
      "technologiesUsed": "HTML, CSS, JS, PHP, MySQL",
      "projectDate": "2019-06-01"
    },
    {
      "type": "Project",
      "projectName": "My Customizable Project Navigator V2.0",
      "imageLink": "https://dl.dropbox.com/scl/fi/vcx9z4e8f86j56su4iqca/MyProjectNavigatorV2.JPG?rlkey=ajjkhl7qx19ofor6kj9og0o7b&st=y224b3c6&dl=0",
      "progress": "Completed",
      "githubLink": "https://github.com/rony9707/projectNavigator",
      "projectURL": "https://myprojectnavigator.web.app",
      "description": "This project builds upon the foundation of Version 1, offering significant improvements for enhanced customization and ease of use. It is designed to be more accessible, allowing anyone to tailor it to their specific needs effortlessly.",
      "technologiesUsed": "HTML, CSS, TS, AngularI",
      "projectDate": "2024-07-14"
    },
    {
      "type": "NPM Package",
      "projectName": "Angular Grid Library",
      "imageLink": "https://dl.dropboxusercontent.com/scl/fi/tv8x08q1rjs9by6kq5wzf/Bitsofm3.JPG?rlkey=79tqmqd7n9pni05nnnp1i5vmx&st=8u8fg5ge&dl=0",
      "progress": "Completed",
      "npmLink": "https://www.npmjs.com/package/ag-grid-c?activeTab=readme",
      "npmInstallCMD": "npm i ag-grid-c",
      "description": "A table grid for angular projects to use with sorting, finterting and exporting features.",
      "technologiesUsed": "HTML, CSS, TS, Angular, Material UI",
      "projectDate": "2024-07-14"
    },
    {
      "type": "NPM Package",
      "projectName": "Angular Gallery Library",
      "imageLink": "https://dl.dropbox.com/scl/fi/qi3v8g9jqwmnup1wtr7u6/gallery.JPG?rlkey=2yv564la7kz0vtsdicemeu37o&e=1&st=91bx2prx&dl=0",
      "progress": "Completed",
      "npmLink": "https://www.npmjs.com/package/gallery-ang",
      "npmInstallCMD": "npm i gallery-ang",
      "description": "A simple gallery to slide your pics",
      "technologiesUsed": "HTML, CSS, TS, Angular",
      "projectDate": "2025-01-14"
    }
  ],
  "socialLinks": [
    {
      "platform": "Facebook",
      "url": "https://www.facebook.com/agnibha.chowdhury.56/",
      "iconClass": "fa fa-facebook"
    },
    {
      "platform": "LinkedIn",
      "url": "https://www.linkedin.com/in/agnibhachowdhury/",
      "iconClass": "fa fa-linkedin"
    },
    {
      "platform": "Instagram",
      "url": "https://www.instagram.com/ronynatsu/",
      "iconClass": "fa fa-instagram"
    },
    {
      "platform": "YouTube",
      "url": "https://www.youtube.com/channel/UCEqOhC1R_Ba68tvQrNJba2A",
      "iconClass": "fa fa-youtube"
    }
  ],
  "experiences": [
    {
      "company": "Capgemini",
      "location": "Navi Mumbai, India",
      "duration": "2020 - Present",
      "responsibilities": [
        "Developed business-benefitting solutions to enhance efficiency and speed.",
        "Created stored procedures and views for effective business solution development.",
        "Analyzed and resolved complex issues promptly to ensure smooth business operations.",
        "Managed client requirements from inception to delivery, including estimation, SOW writing, and on-time delivery.",
        "Designed and implemented programs to simplify complex tasks and streamline workflows.",
        "Facilitated smooth onboarding for new team members, guiding them through project technology, structure, and workflow."
      ]
    }
  ],
  "songs": [
    "https://dl.dropbox.com/scl/fi/8qc0ugn52k94so1s9c4th/A-plague-tale.mp3?rlkey=b7jr9xm4by1rqe9rfjaztqcsz&st=dguajlsd&dl=0",
    "https://dl.dropbox.com/scl/fi/o6jnyr7fbgv2s0wekjjih/paradox-128-ytshorts.savetube.me.mp3?rlkey=839eb70vjeag2850csk7w5cjq&st=kugjp7zn&dl=0",
    "https://dl.dropbox.com/scl/fi/s76vxgn0794imk3y870ab/Preet.mp3?rlkey=9wsj6txwvcnvhc5ugz4uwv16q&st=rg3sx9sv&dl=0",
    "https://dl.dropbox.com/scl/fi/js7juwrseiuutzhh7ilty/Sketchbook.mp3?rlkey=higkaitf2yp7k5i9mzogcsqc4&st=eoqs5ylh&dl=0",
    "https://dl.dropbox.com/scl/fi/q6bwq2tyv5o948guiiati/Spider-Man-Into-the-Spider-Verse.mp3?rlkey=fiqhp78jjc32iqg7lzih22k49&st=6vbzxd4g&dl=0"
  ]
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: mockUser
              }
            }
          }
        },
        provideHttpClient(),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
