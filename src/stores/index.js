import { defineStore } from "pinia";
import axios from "axios";
import cheerio from "cheerio";

const API_KEY = "ZzS2kTkLxxTLRlA3xjJCHiZDID2wn8TQMfT77nbl";
const NEWSFEED_API_URL = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}`;
const API_PARAMS = {
  locale: "us",
  language: "en",
  limit: 5,
};

export const useArticlesStore = defineStore("articles", {
  state: () => {
    return {
      loading: true,
      articles: [],
      selectedArticle: {},
      rawArticle: "",
      error: "",
    };
  },
  actions: {
    async fetchArticles() {
      try {
        console.log("CALLING NEWSFEED API");
        const { data: response } = await axios.get(NEWSFEED_API_URL, {
          params: API_PARAMS,
        });
        this.articles = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchArticlePage() {
      try {
        console.log("FETCHING FULL ARTICLE FROM: ", this.selectedArticle.url);
        const { data: html } = await axios.get(this.selectedArticle.url);

        let $ = cheerio.load(html);
        let $article = $("article").html();
        let $main = $("main").html();
        let $mainClass = $("[class*='main']").html();

        if ($article) {
          this.rawArticle = $article;
          console.log("$article: ", $article);
        } else if ($main) {
          this.rawArticle = $main;
          console.log("$main: ", $main);
        } else if ($mainClass) {
          this.rawArticle = $mainClass;
          console.log("$mainClass: ", $mainClass);
        } else {
          this.error = `Could not load the article.`;
        }

        this.loading = false;
      } catch (error) {
        this.error = `Could not load the article. Error Details: ${error.message}`;
        this.loading = false;
        console.log(error);
      }
    },
    setArticle(article) {
      this.selectedArticle = article;
    },
    resetArticle() {
      this.rawArticle = "";
      this.selectedArticle = {};
      this.error = "";
      this.loading = true;
    },
  },
});
