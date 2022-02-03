<script>
  import 'bulma/css/bulma.css'
</script>

 


<div class="container" >
<div class="columns">
  <div class="column is-one-third">
  <div class="box">
  <div class="title is-5">Столбец</div>
    Для начала хотелось бы проверить респонсивность.
    То есть если сузить ширину окна, то эти три столбца
    должны аккуратно отформатироваться в три строки.
    Header и Footer Битрикса тоже должны как-то переформатироваться
    и все это должно произойти синхронно. 
    Дизайн же должен быть mobile-first!
    </div>
  </div>
  <div class="column is-one-third">
      <div class="box">
         <p>
        <span class="icon-text">
          <span class="icon">
             <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
        </span>
       </p>
       <p>
         Еще нужно проверить иконки. Сейчас fontawesome грузится в index.html,
         но можно загрузить и в node-modules. Не знаю, как лучше. 
         Нужно проверить все варианты.
      </p>
<span class="icon-text">
  <span class="icon has-text-success">
  
    <i  class="fas fa-check-square"></i>
       
    <i style="color:blue; font-size:1rem"  class="fas fa-check-square"></i>
    <span>Success</span>
  </span>
  
</div>
      </div>
  </div>


  <div class="column is-one-third">
     <div class="box">
        Third column
    </div>
  </div>

</div>
</div>




<style>
</style>