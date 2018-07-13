var  express 				= require("express"),
		 app 				= express(),
		 bodyParser 		= require("body-parser"),
		 mongoose 			= require("mongoose"),
		 passport 			= require("passport"),
		 LocalStrategy		= require("passport-local"),
		 methodOverride		= require("method-override"),
		 flash				= require("connect-flash"),
		 Campground			= require("./models/campground"),
		 User				= require("./models/user"),
		 seedDB   			= require("./seeds"),
		 Comment			= require("./models/comment");
		 
		// REQUIRING ROUTES
		var commentRoutes		 = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes			 = require("./routes/index")

		//	seedDB();

		app.use(bodyParser.urlencoded({extended: true}));
		app.set("view engine", "ejs");
		app.use(express.static(__dirname + "/public"));
		app.use(methodOverride("_method"));
		app.use(flash());

		//PASSPORT CONFIGURATION
		app.use(require("express-session")({
			secret: "Joy is the cutest dog in the world",
			resave: false,
			saveUninitialized: false
		}));
		app.use(passport.initialize());
		app.use(passport.session());
		passport.use(new LocalStrategy(User.authenticate()));
		passport.serializeUser(User.serializeUser());
		passport.deserializeUser(User.deserializeUser());

		app.use(function(req,res,next){
			res.locals.currentUser = req.user;
			res.locals.error = req.flash("error");
			res.locals.success = req.flash("success");
			next();
		});
		
		// mongoose.connect("mongodb://localhost/yelp_camp");
		mongoose.connect("mongodb://dsabanski:guzolina33@ds147190.mlab.com:47190/udemyyelpcamp");

		var request = require('request');
			setInterval(function() {
		   	 	request("https://udemyyelpcampapp.herokuapp.com/");
		}, 1740000); // every 5 minutes (300000)
	
		/*app.listen(3000, function(){
		console.log("Server is running on port 3000");
		}); */
	
		app.use("/" , indexRoutes);
		app.use("/campgrounds" , campgroundRoutes);
		app.use("/campgrounds/:id/comments"  , commentRoutes);
				
		app.listen(process.env.PORT , process.env.IP , function(){
			console.log("Yelp camp server has started");
		})
