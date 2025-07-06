// test-fetch.js
fetch("https://api.themoviedb.org/3/movie/popular?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZiOWI1Yzg4Y2M0ZGQ2MDUwMmMzMzQ2MDQ5NTI2OSIsIm5iZiI6MTc1MTcxNTc3MC4zMDMsInN1YiI6IjY4NjkwZmJhZjJjZDU4NzQ0NjZlNzk1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H6WdhSGUkPw4osuDNKcODjOGat66kFJ-R19iBSMtmcA")
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
