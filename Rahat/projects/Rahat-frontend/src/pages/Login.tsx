import ConnectWallet from "../components/ConnectWallet";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-row-reverse min-h-[100vh] flex-1 border">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-100">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div></div>
            <div className="mt-10">
              <div>
                <div>
                  <ConnectWallet />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://www.unicef.org/nepal/sites/unicef.org.nepal/files/styles/media_large_image/public/Rahat%2047%20Sudha%20Devi%20Mandal_0.jpg.webp?itok=pV1NjIPY"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
