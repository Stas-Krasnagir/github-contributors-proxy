import fetch from "node-fetch";
import { Repos, Contributor } from "./Interfaces";

export class GithubRepos {
  async requesRepos(orgName: string)
    : Promise<string[]> {
    let url: string = "https://api.github.com/users/" + orgName + "/repos";
    const json: JSON = await fetch(url, {
      headers:
        { Authorization: process.env.PERSONAL_TOKEN }
    })
      .then(response => response.json())
    return Object
      .entries(json)
      .map(repo => {
        let tmp = Repos.decode(repo[1]);
        if (tmp._tag === "Right") {
          return tmp.right['name']
        }
      })
  }
}


export class GithubContributor {
  async requestContributors(orgName: string, reposNames: string[]): Promise<[string, number][]> {
    let rowContributors = new Map<string, number>();
    for (let i in reposNames) {
      let url: string = "https://api.github.com/repos/" + orgName + "/" + reposNames[i] + "/contributors";
      let json: JSON = await fetch(url, { headers: { Authorization: process.env.PERSONAL_TOKEN } })
        .then(response => response.json());

      Object
        .entries(json)
        .map(contributor => {
          let tmp = Contributor.decode(contributor[1]);
          if (tmp._tag === "Right") {
            let login: string = tmp.right['login'];
            let contributions: number = tmp.right['contributions'];

            if (rowContributors.has(login)) {
              let lastContrNum: number = rowContributors.get((login));
              rowContributors.set(login, lastContrNum + contributions);
            }
            else {
              rowContributors.set(login, contributions);
            }
          }
        })
    }



    let sortContributors: [string, number][] = Array.from(rowContributors.entries())
    if (sortContributors.length > 1) {
      return sortContributors.sort(function (a, b) {
        return (b[1] - a[1])
      });
    }
    else {
      return sortContributors
    };
  }
}