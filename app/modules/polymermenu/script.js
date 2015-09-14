      // document.addEventListener('WebComponentsReady', function() {
      //     setTimeout(function() {
      //       polymermenuready();
      //     },100);
      // });
      // function polymermenuready() {
      //   var template = document.querySelector('paper-menu');
      //   // console.log('Template DENTRO', template);
      //   if(template){
      //     template.addEventListener('iron-select', function(e){
      //
      //     });
      //   }
      // }
      document.addEventListener('iron-select', function(e) {
          window.location.href = e.detail.item.custom;
      });
