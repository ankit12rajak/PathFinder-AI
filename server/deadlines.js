const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

async function fetchJeeDate() {
  try {
    const res = await axios.get('https://jeemain.nta.ac.in/');
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { name: 'JEE Main Exam', date: `${yyyy}-${mm}-${dd}` };
    }
  } catch (e) {}
  // Fallback static date
  return { name: 'JEE Main Exam', date: '2025-09-15' };
}

async function fetchNeetDate() {
  try {
    const res = await axios.get('https://neet.nta.nic.in/');
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { name: 'NEET Exam', date: `${yyyy}-${mm}-${dd}` };
    }
  } catch (e) {}
  return { name: 'NEET Exam', date: '2025-10-05' };
}

async function fetchCuetDate() {
  try {
    const res = await axios.get('https://cuet.samarth.ac.in/');
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { name: 'CUET Exam', date: `${yyyy}-${mm}-${dd}` };
    }
  } catch (e) {}
  return { name: 'CUET Exam', date: '2025-11-15' };
}

async function fetchClatDate() {
  try {
    const res = await axios.get('https://consortiumofnlus.ac.in/clat-2025/');
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { name: 'CLAT Exam', date: `${yyyy}-${mm}-${dd}` };
    }
  } catch (e) {}
  return { name: 'CLAT Exam', date: '2025-12-07' };
}

router.get('/', async (req, res) => {
  const deadlines = [];
  const jee = await fetchJeeDate();
  const neet = await fetchNeetDate();
  const cuet = await fetchCuetDate();
  const clat = await fetchClatDate();
  if (jee) deadlines.push(jee);
  if (neet) deadlines.push(neet);
  if (cuet) deadlines.push(cuet);
  if (clat) deadlines.push(clat);
  res.json(deadlines);
});

module.exports = router;