function startObserver(faders){
    const options = {
        threshold: 0, 
        rootMargin: "0px 0px -100px 0px"
    }


    const onScroll = new IntersectionObserver(
        function(entries, onScroll){
            entries.forEach(entry => {
                if(!entry.isIntersecting){
                    return;
                }else{
                    entry.target.classList.add("appear");
                    onScroll.unobserve(entry.target);
                }
            });
        }, options  
    );


    faders.forEach(fader => {
        console.log(fader)
        onScroll.observe(fader)
    });

}