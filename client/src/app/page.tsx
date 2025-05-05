import Competitions from "@/components/Competitions";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Blogs from "@/components/Blogs"
import Courses from "@/components/Courses"

export default async function Home() {
  let carousols = [];
  let competitions = [];
  let blogs = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/carousel`,
      {
        next: { revalidate: 0 }, 
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    carousols = data?.carouselItems || [];
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/competition`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    competitions = data?.competitions || [];
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blogs`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    blogs = data?.blogs || [];
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }

  return (
    <div className="  ">
      <Header />
      <Hero carousols={carousols} />
      <Competitions competitions={competitions} />
      <Blogs blogs={blogs} />
      <Courses />
    </div>
  );
}
