def srgb(c):
    c=c/255
    return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16) for i in (0,2,4)]
    return 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b)
def R(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb); return (hi+0.05)/(lo+0.05)

W="#FFFFFF"; GRAY="#F4F5F7"; NAVY="#0A0F1F"
fails=[]
def chk(label,fg,bg,need):
    r=R(fg,bg); ok=r>=need
    if not ok: fails.append((label,fg,bg,r,need))
    print(f"  {'OK ' if ok else 'FAIL'} {label:42} {r:5.2f}:1 (need {need})")

A={"blue":dict(brand="#1C78FF",ui="#0F63E0",text="#0F63E0",strong="#0F63E0",ink="#FFFFFF",tint="#E7F0FF"),
   "magenta":dict(brand="#C026D3",ui="#C026D3",text="#A21DB2",strong="#A21DB2",ink="#FFFFFF",tint="#FAE8FD"),
   "green":dict(brand="#22C55E",ui="#17914A",text="#15803D",strong="#15803D",ink="#0A0F1F",tint="#DCFCE7"),
   "orange":dict(brand="#FC9639",ui="#C25E04",text="#A34D09",strong="#A34D09",ink="#0A0F1F",tint="#FEEFD5"),
   "grey":dict(brand="#343A44",ui="#343A44",text="#343A44",strong="#343A44",ink="#FFFFFF",tint="#F4F5F7")}

print("=== accent roles, per hue ===")
for n,s in A.items():
    chk(f"{n}: -ui as rule/icon on white",      s['ui'],W,3.0)
    chk(f"{n}: -text as body on white",         s['text'],W,4.5)
    chk(f"{n}: white label on -strong (.hl-box/.num-badge)", W,s['strong'],4.5)
    chk(f"{n}: -text on its own tint",          s['text'],s['tint'],4.5)
    chk(f"{n}: -ink on brand fill (large only)",s['ink'],s['brand'],3.0)

print("\n=== semantic text ===")
for l,c in [("--text-heading","#0A0F1F"),("--text-body","#343A44"),("--text-muted","#626974"),
            ("--text-link","#0F63E0"),("--text-error","#D42020")]:
    chk(f"{l} on white",c,W,4.5)
    chk(f"{l} on surface-gray",c,GRAY,4.5)

print("\n=== hero: white text on --ec-blue-strong ===")
chk("hero eyebrow 14px bold",  W,"#0F63E0",4.5)
chk("hero sub 18px",           W,"#0F63E0",4.5)
chk("hero trust 17px",         W,"#0F63E0",4.5)
chk("hero micro 15px",         W,"#0F63E0",4.5)
chk("hero h1 40px+ (large)",   W,"#0F63E0",3.0)

print("\n=== dark bands (navy) ===")
chk("white on navy",W,NAVY,4.5)
chk("gray-300 on navy","#D6DAE0",NAVY,4.5)

print("\n"+"="*54)
print(f"TOTAL FAILURES: {len(fails)}")
for f in fails: print("  ",f)
