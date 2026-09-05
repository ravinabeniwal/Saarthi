import Navbar from "@/components/Navbar";
import CreateClassroom from "@/components/CreateClassroom";
import JoinClassroom from "@/components/JoinClassroom";

export default function ClassroomPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-semibold text-navy-900">Get into a classroom</h1>
          <p className="mt-2 text-sm text-mist/60">
            Start a new session as a teacher, or join one with a classroom code.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <CreateClassroom />
          <JoinClassroom />
        </div>
      </main>
    </>
  );
}
