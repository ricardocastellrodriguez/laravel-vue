<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = DB::table('tasks')->get();  // Query Builder

        return response()->json($tasks);
    }
}