const axios = require('axios');
const express = require('express');
const router = express.Router();
import { Cache } from "./cache";
import { GithubRepos, GithubContributor } from "./Github"


const obj = new Cache();
const objGithubRepos = new GithubRepos();
const objGithubContributor = new GithubContributor();


router.get('/:org_name', async function (req, res): Promise<void> {
  const orgName: string = req.params.org_name;

  if (!obj.get(orgName)) {
    let reposNames: string[] = await objGithubRepos.requesRepos(orgName);
    let contributorList = await objGithubContributor.requestContributors(orgName, reposNames);
    obj.add(orgName, contributorList);
    res.status(200).send(contributorList);
  }
  else {
    console.log("Data from cache")
    obj.add(orgName, obj.get(orgName));
    res.status(200).send(obj.get(orgName));
  }
});

module.exports = {
  rout: router,
};



