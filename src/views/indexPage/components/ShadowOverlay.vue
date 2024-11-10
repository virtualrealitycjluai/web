<template>
  <div class="shadow-overlay"></div>
</template>

<script>
export default {
  name: 'ShadowOverlay',
};
</script>

<style>
.shadow-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 101vw;
  height: 100vh;
  box-shadow: 
    0px -23px 50px 20px rgba(0, 0, 0, 0.23) inset,
    0px -36px 30px 0px rgba(0, 0, 0, 0.2) inset,
    0px -80px 40px 0px rgba(0, 0, 0, 0.15) inset,
    0px 2px 1px 0px rgba(0, 0, 0, 0.06),
    0px 4px 2px 0px rgba(0, 0, 0, 0.09),
    0px 8px 4px 0px rgba(0, 0, 0, 0.09),
    0px 16px 8px 0px rgba(0, 0, 0, 0.09),
    0px 32px 16px 0px rgba(0, 0, 0, 0.09);
  transform: translate(-50%, -50%); 
  pointer-events: none;
  z-index: 1000;
}

</style>
