var CustomLoadingScreen = me.ScreenObject.extend({
   init: function() {
      this.parent(true);
      this.logo = new me.Font('century gothic', 32, 'white');
      this.invalidate = false;
      this.loadPercent = 0;
      me.loader.onProgress = this.onProgressUpdate.bind(this);
   },

   onProgressUpdate: function(progress) {
      this.loadPercent = progress;
      this.invalidate = true;
   },

   update: function() {
      if (this.invalidate===true) {
         this.invalidate = false;
         return true;
      }
      return false;
   },

   onDestroyEvent : function () {
      this.logo = null;
   },

   draw : function(context) {
      me.video.clearSurface (context, "black");
      logo_width = this.logo.measureText(context,"awesome loading screen").width;
      this.logo.draw(context,
                     "awesome loading screen",
                     ((context.canvas.width - logo_width) / 2),
                     (context.canvas.height + 60) / 2);
      var width = Math.floor(this.loadPercent * context.canvas.width);
      context.strokeStyle = "silver";
      context.strokeRect(0, (context.canvas.height / 2) + 40, context.canvas.width, 6);
      context.fillStyle = "#89b002";
      context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 2);
   },
});