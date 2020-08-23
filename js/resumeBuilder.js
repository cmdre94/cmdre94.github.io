var bio = {
	"name": "C. Andre Mauldin",
  	"role": "Sr. Specialist Technical Process Quality",
	"contacts": 
	[	
		{
			"mobile": "817-992-3298",
			"email": "cam94@att.net",
			"github": "cmdre94",
			"location": "Dallas, TX"	
		}	
	],
	"welcomeMessage": "Welcome to my resume",
	"skills": ["JavaScript", "HTML", "CSS", "Python", "Cold Fusion"],
	"biopic": "../static/img/Clifton2005.jpg"
};

var work = {
	"jobs" : 
	[
		{
			"company": "AT&T",
			"position": "Sr. Specialist Technical Process Quality",
			"location": "Dallas, TX",
			"dates": "September 2016 to Present",
			"description": "Uses SQL to convert raw data into charts arranged in the form of a web based dashboard.  Creates automated solutions to perform repetitive tasks in place of manual solutions.  Developes websites used to assist teams in retrieving data and increase productivity."
		},
		{
			"company": "AT&T",
			"position": "Operations Manager",
			"location": "Dallas, TX",
			"dates": "May 2014 to September 2016",
			"description": "Manager of an AT&T dispatch center; Supervised employees who screened alarms on field equipment and dispatched technicians. Used data analysis to optimize the dispatch process"
		},
		{
			"company": "AT&T",
			"position": "Customer Service / Splicing Technician",
			"location": "Dallas, TX",
			"dates": "Dec 1996 to May 2014",
			"description": "Installed, maintained, and repaired telecommunication cables and equipment. Volunteered to be on teams that restored service after hurricanes on the Texas gulf coast."
		}
	]
};

var education = {
	"schools" : 
	[
		{
			"name": "Udacity",
			"dates": "July 2017",
			"location": "Atlanta, GA",
			"degree": "Full Stack Web Developer",
			"major": "This program prepares you for a job as a Full Stack Web Developer, and teaches you to build complex server-side web applications that use powerful relational databases to persistently store data. You learn to build applications that can support any front-end, and scale to support hundreds of thousands of users."
		},
		{
			"name": "Udacity",
			"dates": "July 2016",
			"location": "Atlanta, GA",
			"degree": "Front End Web Developer",
			"major": "You learn to build beautiful, responsive websites optimized for mobile and desktop performance.  Additionally, you learn the fundamentals of how the web works and gain a working knowledge of the three foundational languages that power each and every website: HTML, CSS and JavaScript."
		},
		{
			"name": "The University of North Texas",
			"dates": "May 2004",
			"location": "Denton, TX",
			"degree": "Bachelor of Business Administration",
			"major": "Explored multiple areas of business with a focus on Information technology and statistics."
		},
	],
};

var projects = {
	"projects" :
	[
		{
			"title" : "DOC Dashboard",
			"dates" : "Ongoing",
			"description" : "The DOC Dashboard is an internal site that uses SQL to convert data into charts, known as widgets.  The widgets are drillable by hierarchy, geography, and dates; organized in the form of a web based dashboard.  The dashboard is used by teams for data analysis and decision making.  I am responsible for building widgets based on business requirements",
			"images" : ""
		},
		{
			"title" : "Air Pressure Bulletin Board",
			"dates" : "September 2017",
			"description" : "The Air Pressure center uses a bulletin board to input temporary dispatch instructions.  I created a new bulletin board that is compatible with automation.  This allows the automated system to make a yes/no dispatch decision based on bulletin board data.",
			"images" : "" 
		},
		{
			"title" : "Routine Ticket Tool",
			"dates" : "September 2017",
			"description" : "This project uses automation to create dispatch tickets requested by field managers, replacing manual ticket creation.",
			"images" : ""
		}
	]
};

var places = ["Arp, TX", "Dallas, TX", "Beaumont, TX", "Fort Worth, TX", "Atlanta, GA"];

bio.nameRole = function() {
	$("#header").prepend ('<h1 id="name">'+bio.name+'</h1>');
	$("#header").append ('<span style="color:white;">'+bio.role+'</span><hr/>');
};


bio.displayContacts = function() {
		bio.contacts.forEach(function(me) {
			var formattedMobile = '<p class="flex-item"><span class="orange-text">mobile</span><span class="white-text">'+me.mobile+'</span></p>';
			$("#header").append(formattedMobile);
			$("#footerContacts").append(formattedMobile);

			var formattedEmail = '<p class="flex-item"><span class="orange-text">email</span><span class="white-text">'+me.email+'</span></p>';
			$("#header").append(formattedEmail);
			$("#footerContacts").append(formattedEmail);

			var formattedGithub = '<p class="flex-item"><span class="orange-text">github</span><span class="white-text">'+me.github+'</span></p>';
			$("#header").append(formattedGithub);
			$("#footerContacts").append(formattedGithub);

			/*var formattedTwitter = '<p class="flex-item"><span class="orange-text">twitter</span><span class="white-text">'+me.twitter+'</span></p>';
			$("#header").append(formattedTwitter);
			$("#footerContacts").append(formattedTwitter);*/

			var formattedLocation = '<p class="flex-item"><span class="orange-text">location</span><span class="white-text">'+me.location+'</span></p>';
			$("#header").append(formattedLocation);
			$("#footerContacts").append(formattedLocation);
		})
};


bio.displayBiopic = function() {
	$("#header").append('<img src="'+bio.biopic+'" class="biopic">');
};

bio.displayWelcome = function() {
	$("#header").append('<span class="welcome-message">'+bio.welcomeMessage+'</span>');
};


bio.displaySkills = function() {

		$("#header").append('<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>');

		bio.skills.forEach(function(skill) {
			$("#skills").append('<li class="flex-item"><span class="white-text">'+skill+'</span></li>');
		});			
};

work.displayWork = function() {
		$("#workExperience").append('<div class="work-entry"></div>');
		
		work.jobs.forEach(function(job) {
			$(".work-entry:last").append('<a class="work-txt" href="#">'+job.company+'');
			$(".work-entry:last").append(''+job.position+'</a>');
			$(".work-entry:last").append('<div class="location-text">'+job.location+'</div>');
			$(".work-entry:last").append('<div class="date-text">'+job.dates+'</div>');
			$(".work-entry:last").append('<p><br>'+job.description+'</p>');		
		});
};	



projects.display = function() {
		projects.projects.forEach(function(project) {
			$("#projects").append('<div class="project-entry"></div>');
			$(".project-entry:last").append('<a href="#">'+project.title+'</a>');
			$(".project-entry:last").append('<div class="date-text">'+project.dates+'</div>');
			$(".project-entry:last").append('<p><br>'+project.description+'</p>');
			/*$(".project-entry:last").append('<img img class="featurette-image img-responsive center-block" data-src="holder.js/500x500/auto" src="'+project.images+'" >');*/
		})
};


education.displayEducation = function() {

		$("#education").append('<div class="education-entry"></div>');

		education.schools.forEach(function(school) {
	
			if (school.name == "The University of North Texas") {
			 	$(".education-entry:last").append('<a class="unt" href="https://www.unt.edu/" target="_blank">'+school.name+'');
			}
			else if (school.name == "Udacity") {
				$(".education-entry:last").append('<a class="udacity" href="https://www.udacity.com/" target="_blank">'+school.name+'</a>');
			}
			else
				$(".education-entry:last").append('<a class="school-txt" href="#">'+school.name+'</a>');
				$(".education-entry:last").append('<div class="date-text">'+school.dates+'</div>');
				$(".education-entry:last").append('<div class="location-text">'+school.location+'</div>');
			if (school.degree == "Full Stack Web Developer") {
				$(".education-entry:last").append('<a href="https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004" target="_blank">'+school.degree+'</a>');
			}
			else if (school.degree == "Front End Web Developer") {
				$(".education-entry:last").append('<a href="https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001" target="_blank">'+school.degree+'</a>');
			}
			else if (school.degree == "Bachelor of Business Administration") {
				$(".education-entry:last").append('<a href="https://www.unt.edu/pais/insert/ubusi.htm" target="_blank">'+school.degree+'</a>');
			}
			else	
				$(".education-entry:last").append('<a href="#">'+school.degree+'</a>');
				$(".education-entry:last").append('<p>'+school.major+'</p>');
		})
};

//call functions
bio.nameRole();
bio.displayContacts();
bio.displayBiopic();
bio.displayWelcome();
bio.displaySkills();
work.displayWork();
projects.display();
education.displayEducation();

$(document).click(function(loc) {
});

$("#mapDiv").append(googleMap);