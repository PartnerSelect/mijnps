<template>
  <div class="menu-burger__container">
    <transition name="psmenu" appear>
      <div class="menu-burger__menu">
        <template v-for="(item, i) in menuItems">
          <router-link
            class="menu-burger__item"
            :to="item.path"
            :key="i"
            @click.native="closeMenu()"
            exact
          >{{item.name}}</router-link>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["menuItems", "closeMenu"]
};
</script>