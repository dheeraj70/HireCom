"use client";

import Link from "next/link";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [drop, setDrop] = useState(false);
  const [searchCountry, setSearchCountry] = useState("in");
  const [loadProgress, setLoadProgress] = useState(0);
  const hasMounted = useRef(false);
  const router = useRouter();
  const t = useRef(null);
  const t2 = useRef(null);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  //console.log(session?.user);
  const searchParams = useSearchParams();

  const startLoading = async () => {
    setLoadProgress(30);
    t.current = setTimeout(() => {
      setLoadProgress(60);
      clearTimeout(t.current);
    }, 700);
  };

  const handleClickOutside = (event) => {
    // Check if the clicked element is not inside the dropdown
    if (
      drop &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDrop(false);
    }
  };

  useEffect(() => {
    // Attach event listener to document
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, [drop]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setLoadProgress(100);
    t2.current = setTimeout(() => {
      setLoadProgress(0);
      clearTimeout(t2.current);
    }, 100);
  }, [searchParams]);
  return (
    <nav className="h-[100px] bg-transparent flex flex-col lg:flex-row">
      {loadProgress != 0 && (
        <div className="fixed top-0 left-0 w-full h-1">
          <div
            className="h-full bg-slate-800 transition-all"
            style={{ width: `${loadProgress}%` }}
          ></div>
        </div>
      )}
      <div className="flex bg-white min-w-[100px] justify-between w-full ml-auto  lg:w-1/5">
        <img
          className="object-contain w-[150px] lg:w-auto ml-6"
          src="/logo.png"
          alt="HireCom"
        />
        <div className="flex z-20 lg:hidden relative min-w-[80px] w-1/4 md:w-32 lg:w-1/5 ml-1 mr-6 justify-end items-center">
          {session ? (
            <button
              onClick={() => {
                setDrop(!drop);
              }}
              className="bg-slate-700 h-[60%] aspect-square rounded-[100%] overflow-hidden flex justify-center items-center"
            >
              <img
                className="h-[93%] w-[93%] rounded-full"
                src={session.user.image}
                alt="Pro"
              />
            </button>
          ) : (
            <button
              onClick={() => {
                signIn("google");
              }}
              className="bg-black h-[40px] lg:h-1/2 pl-3 pr-3 rounded-xl text-white flex items-center"
            >
              Sign In
            </button>
          )}
          <div
            ref={dropdownRef}
            className={` transition ease-linear delay-250 pl-2 pr-2 ${
              drop
                ? "translate-y-[100px] opacity-100 visibility-visible pointer-events-auto"
                : "translate-y-[80px] opacity-0 visibility-hidden pointer-events-none"
            } right-[15px]  w-[135px] bg-neutral-200 absolute rounded-lg border-2 border-slate-400`}
          >
            <div
              onClick={() => {
                router.push(`/saved`);
              }}
              className="cursor-pointer pt-2 pb-2 text-center text-[18px]"
            >
              Saved Jobs
            </div>
            <div className="w-full bg-slate-400 h-[2px]"></div>
            <div
              onClick={() => {
                signOut();
              }}
              className="cursor-pointer pt-2 pb-2 text-center text-[18px]"
            >
              Sign Out
            </div>
          </div>
        </div>
      </div>

      <div className="z-0 flex w-full mt-3 lg:mt-0">
        <div className="z-0 flex w-full items-center justify-center">
          <div className="z-0 h-[50px] lg:h-1/2 w-[90%]  md:w-full lg:w-3/5 relative flex items-center overflow-x-hidden">
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="z-0 w-full h-full text-black rounded-xl border-2 border-black lg:pl-3 text-xs lg:text-xl"
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              placeholder="Seach Jobs / Companies / Roles"
            />
            <div
              className={`z-0 h-[calc(100%-10px)] absolute right-[15%] lg:right-[12%] flex items-center gap-[10px]`}
            >
              <div className="z-0 w-[2px] bg-slate-300 h-full rounded-xl"></div>
              <div>
                <i className="hidden lg:block fa-solid fa-location-dot text-slate-400 text-[20px]"></i>
                <select
                  name="country"
                  id="country"
                  className="text-slate-700 w-[100px]"
                  defaultValue={searchCountry}
                  onChange={(e) => {
                    setSearchCountry(e.target.value);
                  }}
                >
                  <option value="af">Afghanistan</option>
                  <option value="al">Albania</option>
                  <option value="dz">Algeria</option>
                  <option value="ar">Argentina</option>
                  <option value="au">Australia</option>
                  <option value="at">Austria</option>
                  <option value="bd">Bangladesh</option>
                  <option value="be">Belgium</option>
                  <option value="br">Brazil</option>
                  <option value="ca">Canada</option>
                  <option value="cl">Chile</option>
                  <option value="cn">China</option>
                  <option value="co">Colombia</option>
                  <option value="cz">Czech Republic</option>
                  <option value="dk">Denmark</option>
                  <option value="eg">Egypt</option>
                  <option value="fi">Finland</option>
                  <option value="fr">France</option>
                  <option value="de">Germany</option>
                  <option value="gr">Greece</option>
                  <option value="hk">Hong Kong</option>
                  <option value="hu">Hungary</option>
                  <option value="in">India</option>
                  <option value="id">Indonesia</option>
                  <option value="ir">Iran</option>
                  <option value="iq">Iraq</option>
                  <option value="ie">Ireland</option>
                  <option value="il">Israel</option>
                  <option value="it">Italy</option>
                  <option value="jp">Japan</option>
                  <option value="jo">Jordan</option>
                  <option value="ke">Kenya</option>
                  <option value="kr">South Korea</option>
                  <option value="kw">Kuwait</option>
                  <option value="my">Malaysia</option>
                  <option value="mx">Mexico</option>
                  <option value="ma">Morocco</option>
                  <option value="nl">Netherlands</option>
                  <option value="nz">New Zealand</option>
                  <option value="ng">Nigeria</option>
                  <option value="no">Norway</option>
                  <option value="pk">Pakistan</option>
                  <option value="pe">Peru</option>
                  <option value="ph">Philippines</option>
                  <option value="pl">Poland</option>
                  <option value="pt">Portugal</option>
                  <option value="qa">Qatar</option>
                  <option value="ru">Russia</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="sg">Singapore</option>
                  <option value="za">South Africa</option>
                  <option value="es">Spain</option>
                  <option value="se">Sweden</option>
                  <option value="ch">Switzerland</option>
                  <option value="tw">Taiwan</option>
                  <option value="th">Thailand</option>
                  <option value="tr">Turkey</option>
                  <option value="ua">Ukraine</option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="gb">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="vn">Vietnam</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                router.push(
                  `/search?query=${searchQuery}&country=${searchCountry}`
                );
                router.refresh();
                startLoading();
                setSearchQuery("");
              }}
              className={`bg-black p-[6px] rounded-md absolute transition-all right-[2%]`}
            >
              <img className="w-7" src="/icons/search.svg" alt="Search" />
            </button>
            {/*<Link href={`/search?query=${searchQuery}&country=${searchCountry}`} className={`bg-black p-[6px] rounded-md absolute transition-all ${focused?"right-[2%]":"right-[-45px]"}`}>	
        <img className='w-7' src="/icons/search.svg" alt="Search" /></Link>*/}
          </div>
        </div>
        <div className="hidden lg:flex relative min-w-[80px] w-1/4 md:w-32 lg:w-1/5 ml-1 mr-6 justify-end items-center ">
          {session ? (
            <button
              onClick={() => {
                setDrop(!drop);
              }}
              className="bg-slate-700 h-[60%] aspect-square rounded-[100%] overflow-hidden flex justify-center items-center"
            >
              <img
                className="h-[93%] w-[93%] rounded-full"
                src={session.user.image}
                alt="Pro"
              />
            </button>
          ) : (
            <button
              onClick={() => {
                signIn("google");
              }}
              className="bg-black h-[40px] lg:h-1/2 pl-3 pr-3 rounded-xl text-white flex items-center"
            >
              Sign In
            </button>
          )}
          <div
            ref={dropdownRef}
            className={`z-20 transition ease-linear delay-250 pl-2 pr-2 ${
              drop
                ? "translate-y-[100px] opacity-100 visibility-visible pointer-events-auto"
                : "translate-y-[80px] opacity-0 visibility-hidden pointer-events-none"
            } right-[15px]  w-[135px] bg-neutral-200 absolute rounded-lg border-2 border-slate-400`}
          >
            <div
              onClick={() => {
                router.push(`/saved`);
              }}
              className="cursor-pointer pt-2 pb-2 text-center text-[18px]"
            >
              Saved Jobs
            </div>
            <div className="w-full bg-slate-400 h-[2px]"></div>
            <div
              onClick={() => {
                signOut();
              }}
              className="cursor-pointer pt-2 pb-2 text-center text-[18px]"
            >
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
