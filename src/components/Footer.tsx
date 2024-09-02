"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-transparent text-black py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} it's by amadich. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
