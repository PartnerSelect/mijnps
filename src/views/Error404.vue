<template>
  <div class="p404-page">
    <div class="p404-content">
      <div class="p404-brand">PS</div>
      <h3 class="oleo">Pagina niet gevonden</h3>
      <p>Deze pagina konden we niet vinden.</p>
      <p>
        <button class="btn btn-rounded" @click="$router.replace('/')">Ga naar startpagina</button>
      </p>
      <p>
        <button class="btn btn-rounded" @click="$router.go(-1)">Ga terug</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
