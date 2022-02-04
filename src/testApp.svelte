<script>
  import 'bulma/css/bulma.css'
</script>

 


<div class="container" >


  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://ursei.ac.ru">
        УрСЕИ
      </a>
  
      <a role="button" href="https://ursei.ac.ru" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>




 <div class="columns">
   <div class="column is-one-third">
     <div class="box">
            Для начала хотелось бы проверить респонсивность.
          То есть если сузить ширину окна, то эти три столбца
          должны аккуратно отформатироваться в три строки.
          Header и Footer Битрикса тоже должны как-то переформатироваться
          и все это должно произойти синхронно. 
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
                <p style='margin-left:25px'>
                      <span class="icon-text">
                          <span class="icon has-text-success">
                                  <i  class="fas fa-check-square"></i>   
                                  <i  class="fas fa-check-circle"></i> 
                                  <i style="color:blue; font-size:1.5em"  class="fas fa-spinner fa-pulse"></i> 
                          </span>                     
                      </span>
                </p>
              </div>
          </div>
       
      
  
        <div class="column is-one-third">
          <div class="box">
            <table class="table is-bordered  is-hoverable is-fullwidth">
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>4</td>
              </tr>
              <tr>
                <td>5</td>
                <td>6</td>
              </tr>
              <tr>
                <td>7</td>
                <td>8</td>
              </tr>
          </table>
          </div>
        </div>

  </div>
</div>

<style>
  span i{
    margin-left:20px;
  }
</style>