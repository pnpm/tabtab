#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const templateFiles = fs.readdirSync(__dirname).filter(name => name.startsWith('completion.'));

/** @type {Record.<String, String>} */
const jsonData = {}

for (const templateFileName of templateFiles) {
  const templateFilePath = path.join(__dirname, templateFileName);
  const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
  const ext = templateFileName.replace('completion.', '');
  jsonData[ext] = templateContent;
}

const jsonFilePath = path.join(__dirname, 'data.json');
const jsonText = JSON.stringify(jsonData);
fs.writeFileSync(jsonFilePath, jsonText);
