"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Command, Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { navItems, siteConfig } from "@/config/site";
import { CommandPalette } from "./command-palette";

export function Navbar() {
  const [open,setOpen]=useState(false); const [palette,setPalette]=useState(false); const { resolvedTheme,setTheme }=useTheme();
  useEffect(()=>{const fn=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setPalette(v=>!v)}};addEventListener("keydown",fn);return()=>removeEventListener("keydown",fn)},[]);
  return <><header className="glass" style={{position:"fixed",top:0,left:0,right:0,zIndex:50,borderWidth:"0 0 1px"}}><div className="container" style={{height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <Link href="/" aria-label="Angga home" style={{fontWeight:900,letterSpacing:"-.04em",fontSize:"1.15rem"}}><span style={{color:"var(--cyan)"}}>A</span>NGGA<span style={{color:"var(--cyan)"}}>.</span></Link>
    <nav aria-label="Main navigation" className="desktop-nav" style={{display:"flex",alignItems:"center",gap:22}}>{navItems.map(([name,href])=><Link key={name} href={href} style={{fontSize:12,color:"var(--muted)",textDecoration:"none"}}>{name}</Link>)}</nav>
    <div style={{display:"flex",gap:8}}><button className="button" aria-label="Open command palette" onClick={()=>setPalette(true)}><Command size={15}/><span className="desktop-only">Ctrl K</span></button><button className="button" aria-label="Toggle color theme" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")}><span className="theme-icon theme-sun"><Sun size={16}/></span><span className="theme-icon theme-moon"><Moon size={16}/></span></button><a className="button button-primary desktop-only" href={siteConfig.cvUrl}><Download size={15}/>CV</a><button className="button mobile-only" aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)}>{open?<X size={18}/>:<Menu size={18}/>}</button></div>
  </div>{open&&<nav className="mobile-menu container" style={{padding:"8px 0 22px",display:"grid",gap:4}}>{navItems.map(([name,href])=><Link className="button" key={name} href={href} onClick={()=>setOpen(false)}>{name}</Link>)}</nav>}</header><CommandPalette open={palette} onClose={()=>setPalette(false)}/><style jsx global>{`.mobile-only{display:none}.mobile-menu{display:none!important}.theme-icon{display:inline-flex}.theme-sun{display:none}.dark .theme-sun{display:inline-flex}.dark .theme-moon{display:none}@media(max-width:950px){.desktop-nav{display:none!important}.mobile-only{display:inline-flex}.mobile-menu{display:grid!important}}@media(max-width:560px){.desktop-only{display:none!important}}`}</style></>;
}
