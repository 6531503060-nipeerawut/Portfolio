require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// The CV lives in /public; keeping the path in one place means the file can be
// renamed without hunting through the template.
const RESUME_HREF = "/Peerawut-Nipakornpan-Full-Stack-Developer.pdf";

// Open Graph needs absolute URLs, and the copyright year should not depend
// on the visitor having JavaScript enabled — both are resolved per request.
app.get("/", (req, res) => {
    const proto = req.headers["x-forwarded-proto"] || req.protocol;
    const origin = `${proto}://${req.get("host")}`;

    res.render("index", {
        origin,
        year: new Date().getFullYear(),
        resumeHref: RESUME_HREF,
    });
});

module.exports = app;
