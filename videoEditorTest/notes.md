# c3nn's Online Video Editor Alternative
###### (bc everything else crashes)

## With flexbox:
You can either have the basis be *0%* and everyone just *flex-grow* to fill up space, or you can have the basis be *100%* and everyone just *flex-shrink* to fit into the space.
Currently, the code uses the *100% shrink* method but I think I should try the other sometime.
###### (also all of this breaks in firefox for some reason)

## With layout:
When resizing, make sure to take the width off of the sibbling next to it

....|....|....|
resizes \/ to
......|..|....|
instead \/ of
......|....|..|
