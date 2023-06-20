const express = require('express');
const session = require('express-session');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID =
	'320144060076-ksiqgbthl4ttj50s5m17v68u7a8re7fd.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET = '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';

const isLoggedIn = (req, res, next) => {
	req.user ? next() : res.sendStatus(401);
};

const app = express();

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/auth.html');
});

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/resource',
		failureRedirect: '/login',
	})
);

app.get('/resource', isLoggedIn, (req, res) => {
	res.send(`RESOURCE<br>${req.user.id}<br>${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.send('Logout');
	});
	// req.session.destroy();
	// res.send('Logout');
});

app.all('*', (req, res) => {
	res.status(404);
	throw new Error('Page not found');
});

app.use(function (err, req, res, next) {
	res.send(err.message);
});

app.listen(3000);
