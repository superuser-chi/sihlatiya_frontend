<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link"
            href="http://www.creative-tim.com"
          >
            Tech Giants
          </a>
        </li>

      </ul>
      <div class="copyright">
        © {{year}} made by
        <a
          href="#"
          target="_blank"
          rel="noopener"
        >Tech Giants</a> assisting SMMEs Eswatini.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
