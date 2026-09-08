<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = DB::table('tasks')
            ->orderByDesc('id')
            ->get();                           // Query Builder

        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $id = DB::table('tasks')->insertGetId([
            'title' => $data['title'],
            'completed' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $task = DB::table('tasks')
            ->where('id', $id)
            ->first();

        return response()->json($task, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'completed' => ['sometimes', 'boolean'],
        ]);

        $data['updated_at'] = now();

        DB::table('tasks')
            ->where('id', $id)
            ->update($data);

        $task = DB::table('tasks')
            ->where('id', $id)
            ->first();

        return response()->json($task);
    }

    public function destroy(int $id): JsonResponse
    {
        DB::table('tasks')
            ->where('id', $id)
            ->delete();

        return response()->json(null, 204);
    }
}